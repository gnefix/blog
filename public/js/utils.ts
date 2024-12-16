import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

interface bangumiImages {
    logo?: string;
    main?: string;
    array: string[];
}

export function getFilenamesInDirectory(directoryPath:string) {
    return fs.readdirSync(directoryPath).map(file => path.join(directoryPath, file));
}

export function gatImagesPath(bangumi_name:string):bangumiImages {
      let directory = getFilenamesInDirectory('./public/images/' + bangumi_name);
      let images:bangumiImages = {array: []};
        directory.forEach((file) => {
            if (file.includes('logo')) {
                images.logo = file;
            } else if (file.includes('main')) {
                images.main = file;
            }
            else {
                images.array.push(file);
            }
         });
        return images;
}
export async function getImageSize(imagePath: string) {
    return await sharp(imagePath).metadata().then( (value) =>{
        return value;
    })
}

export function setTheme(){
    let theme = window.localStorage.getItem('theme');
    if(theme ==='dark'){
        window.localStorage.setItem('theme','dark');
        document.documentElement.dataset.theme='sunset'
    }else if(theme === 'light'){
        window.localStorage.setItem('theme','light');
        document.documentElement.dataset.theme='wireframe'
    }else {
        window.localStorage.setItem('theme','light');
        document.documentElement.dataset.theme='wireframe'
    }
}