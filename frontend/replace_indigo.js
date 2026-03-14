import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const walk = (dir, done) => {
    let results = [];
    fs.readdir(dir, (err, list) => {
        if (err) return done(err);
        let pending = list.length;
        if (!pending) return done(null, results);
        list.forEach((file) => {
            file = path.resolve(dir, file);
            fs.stat(file, (err, stat) => {
                if (stat && stat.isDirectory()) {
                    walk(file, (err, res) => {
                        results = results.concat(res);
                        if (!--pending) done(null, results);
                    });
                } else {
                    if (file.endsWith('.jsx')) {
                        results.push(file);
                    }
                    if (!--pending) done(null, results);
                }
            });
        });
    });
};

walk(path.join(__dirname, 'src'), (err, files) => {
    if (err) throw err;
    files.forEach((file) => {
        let content = fs.readFileSync(file, 'utf8');
        // Replace typical Tailwind color prefixes
        const updated = content.replace(/(text|bg|border|ring|from|to|fill|stroke|hover:text|hover:bg|hover:border|dark:text|dark:bg|dark:border|dark:hover:text|dark:hover:bg|focus:ring|focus:border|selection:bg|selection:text|dark:selection:bg|dark:selection:text|group-hover:text|ring-inset|hover:text)-indigo-/g, '$1-primary-');

        if (content !== updated) {
            fs.writeFileSync(file, updated, 'utf8');
            console.log(`Updated: ${file}`);
        }
    });
    console.log('Finished refactoring colors to primary.');
});
