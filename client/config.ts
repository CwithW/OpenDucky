
import * as fs from 'fs';
import * as path from 'path';

let config:any = null;

export function getConfig() {
    if (config == null) {
        config = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json'), 'utf-8'));
    }
    return config;
}