var kpccTimelineConfig = {
    // choose spreadsheet or flat-file
    dataSource: 'spreadsheet',

    // example spreadsheet key
    key: '0Aq8qwSArzKP9dDJlU2FoZEVYNUJQRHFXZ2plaF9zN3c',

    // example path to file
    sourceFile: 'data/moments-in-giants-godgers-rivalry_timeline.json',

    // name of sheet containing timeline entries
    sheetName: 'Posts',

    // name of sheet containing timeline meta
    sheetMeta: 'MetaData',

    // url of the timeline
    projectDirectory: 'http://localhost:8880/2kpcc/project_template/project-timeline/',

    // newest or oldest
    defaultDirection: 'oldest',

    // collapsed or expanded
    defaultExpansion: 'expanded',

    // display social sharing links
    sharing: true,

    // groupSegmentByYear or groupSegmentByDecade
    groupFunction: 'groupSegmentByYear',

    // adjust timeline width
    width: '90%'
};