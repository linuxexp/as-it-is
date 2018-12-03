const fs = require("fs");
const path = require("path");
const YAML = require("yamljs");
const _ = require("lodash");

function is_dir(path) {
    try {
        const stat = fs.lstatSync(path);
        return stat.isDirectory();
    } catch (e) {
        console.log(e);
        return false;
    }
}

const bookStore = "book";
let book = [];

const bookPath = path.join(__dirname, bookStore);
const chaptersDir = fs.readdirSync(bookPath);
chaptersDir.forEach((chapterDir, index) => {

    const dir = path.join(bookPath, chapterDir);

    if (!is_dir(dir)) return;

    const chapter = {
        index: index,
        entity: "chapter",
        title: "Title",
        purport: "Purport",
        verses: []
    };

    const chapterFile = path.join(dir, chapterDir + '.yml');
    console.log(chapterFile);

    if (!fs.existsSync(chapterFile)) {
        console.warn('chapter file at ' + chapterFile + ' missing');
        return;
    }

    const cJs = YAML.load(chapterFile);

    chapter.title = cJs.title;
    chapter.purport = cJs.purport;
    chapter.index = cJs.index - 1;

    // build the verses array
    const verseDir = path.join(dir, "verses");
    console.log(verseDir);
    const verseFiles = fs.readdirSync(verseDir);
    chapter.verses = verseFiles.map((verseFile) => {
        const versePath = path.join(verseDir, verseFile);
        if (is_dir(versePath)) return;
        // yaml to json here
        console.log(versePath);
        const vJS = YAML.load(versePath);
        vJS.entity = "verse";
        // TODO: verse validation here, syn should equal sans
        vJS.index -= 1;
        return vJS;
    });

    // sort the verses object
    chapter.verses = _.sortBy(chapter.verses, "index");
    book.push(chapter);
});

book = _.sortBy(book, "index");
fs.writeFileSync('./app/factory/book.json', JSON.stringify(book));
