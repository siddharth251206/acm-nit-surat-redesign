const fs = require('fs')
const path = require('path')

/**
 * Copy team photos from /public/teams/{year}/ to /public/team/{year}/
 * Source files are numbered (e.g. 221.jpg, 222.jpg).
 * Target files are named by member (e.g. smit-marakna.jpg).
 * Mapping is based on the order in teams.json — numbered files sorted
 * numerically map 1:1 to the member list.
 */

const teamsData = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../src/data/teams.json'), 'utf-8')
)

const years = ['2012','2013','2014','2015','2016','2017','2018','2019','2020','2021','2022','2023','2024','2025']

years.forEach(year => {
  const src = path.join(__dirname, '../public/teams', year)
  const dest = path.join(__dirname, '../public/team', year)

  if (!fs.existsSync(src)) {
    console.log(`⏭ Skipping ${year} — source not found`)
    return
  }

  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true })

  const team = teamsData.find(t => t.year === year)
  if (!team || !team.members || team.members.length === 0) {
    console.log(`⏭ Skipping ${year} — no members in teams.json`)
    return
  }

  // Get numbered source files, sorted numerically
  const srcFiles = fs.readdirSync(src)
    .filter(f => /^\d+\.jpg$/i.test(f))
    .sort((a, b) => parseInt(a) - parseInt(b))

  console.log(`\n📁 ${year}: ${srcFiles.length} photos → ${team.members.length} members`)

  const count = Math.min(srcFiles.length, team.members.length)
  for (let i = 0; i < count; i++) {
    const srcFile = srcFiles[i]
    const targetName = path.basename(team.members[i].photo)
    fs.copyFileSync(path.join(src, srcFile), path.join(dest, targetName))
    console.log(`   ${srcFile} → ${targetName}`)
  }

  if (team.members.length > srcFiles.length) {
    for (let i = srcFiles.length; i < team.members.length; i++) {
      console.log(`   ⚠ No photo for: ${team.members[i].name} — initials fallback`)
    }
  }
})

// Copy unknown.jpg fallback
const unknownSrc = path.join(__dirname, '../public/teams/2025/unknown.jpg')
const unknownDest = path.join(__dirname, '../public/team/unknown.jpg')
if (fs.existsSync(unknownSrc)) {
  if (!fs.existsSync(path.dirname(unknownDest))) {
    fs.mkdirSync(path.dirname(unknownDest), { recursive: true })
  }
  fs.copyFileSync(unknownSrc, unknownDest)
  console.log('\n✓ Copied unknown.jpg fallback')
}

console.log('\nDone!')
