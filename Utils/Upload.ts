import fs from 'fs-extra'
import path from 'path'
interface fileData {
    fieldName: string;
    originalName: string;
    encoding: string;
    mimeType: string;
    buffer: any;
    size: number;
}

class Upload {
    static saveToDisk = ({
        directory,
        data,
        fileName,
        overwrite = false
    }: {
        directory: string;
        data: fileData;
        fileName: string;
        overwrite: boolean
    }) => {
        if (!data || !data.buffer) {
            throw new Error("Invalid format: data")
        }
        directory = path.resolve(directory);
        if (!fileName) fileName = data.originalName;
        const pathFile = path.join(directory, fileName);

        if (!overwrite && fs.existsSync(pathFile)) {
            throw new Error("File exist!");
        }

        fs.ensureDirSync(directory);
        fs.writeFileSync(pathFile, data.buffer);
        return pathFile;
    }

    static removeFromDisk = (pathFile: string) => {
        pathFile = path.resolve(pathFile);

        if (fs.existsSync(pathFile)) {
            fs.removeSync(pathFile);
        }

        return true;
    };

    static moveToDirectory = (oldPath: string, newDirectory: string) => {
        let fileName = path.basename(oldPath);
        let pathFile = path.resolve(oldPath);
        let directory = path.resolve(newDirectory);
        let newPath = path.join(directory, fileName);
        if (fs.existsSync(pathFile)) {
            fs.ensureDirSync(directory);
            fs.renameSync(pathFile, newPath, function (err: any) {
                if (err) {
                    throw new Error(err);
                }
            });
        }
    };
}
export default Upload;
