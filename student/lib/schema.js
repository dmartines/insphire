StudentProfile = new SimpleSchema({
    studentId: {
        type: String,
        label: "inspHIRE id",
        optional:true
    },
    dream: {
        type: [String],
        label: "Dreams"
    },
    youtubeEmbed: {
        type: String,
        label: "Youtube embed code",
        max: 2000,
        optional: true,
        autoform: {
            rows: 3
        }
    }
});