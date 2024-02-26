
import { emptyDir , build } from 'https://deno.land/x/dnt/mod.ts'


await emptyDir(`./npm`)


await build({

    entryPoints : [ `./Source/mod.ts` ] ,
    outDir : `./npm` ,

    shims : {
        deno : true
    },

    package : {

        description : `Font made of ASCII characters` ,
        version : Deno.args[0] ,
        license : 'AGPLv3' ,
        name : '@pordeno/ascii-font' ,

        repository : {
            type : 'git' ,
            url : `git+https://github.com/Pordeno/Ascii-Font.git`
        },

        bugs : {
            url : `https://github.com/Pordeno/Ascii-Font/issues`
        }
    },

    postBuild (){
        Deno.copyFileSync(`LICENSE`,`npm/LICENSE`)
        Deno.copyFileSync(`README.md`,`npm/README.md`)
    }
})
