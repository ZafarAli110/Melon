import { _guards } from "../../modules/guards/_guards";
import { _readText } from "../../modules/fs/_readText";
import { getStaticMethod } from "../../modules/dotnet/getStaticMethod";
import { _setEnvironmentVariable } from "../../modules/std/environment/_setEnvironmentVariable";
import { envParse } from "./envParse";

const { isNullOrWhiteSpace } = _guards.string;
const getFiles = getStaticMethod<string[]>("System.IO:Directory:GetFiles");

function getEnv() {
    if(getFiles("./", "*.env").length === 0) {
        return;
    }
        
    const content = _readText("./.env");

    if(!isNullOrWhiteSpace(content)) {
        const envObject = envParse(content) as Record<string, any>;
    
        Object
            .entries(envObject)
            .forEach(item => _setEnvironmentVariable(item[0], item[1]));
    }
}

export { getEnv }