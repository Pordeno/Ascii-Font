
export { pixelify }

import { Characters , Default } from './Characters.ts'
import { chunk } from 'https://deno.land/std@0.217.0/collections/chunk.ts'


const Blocks = [
    ' ' ,
    '▗' ,
    '▖' ,
    '▄' ,
    '▝' ,
    '▐' ,
    '▞' ,
    '▟' ,
    '▘' ,
    '▚' ,
    '▌' ,
    '▙' ,
    '▀' ,
    '▜' ,
    '▛' ,
    '█'
]



function pixelify ( text : string ){

    const characters = text
        .split('')
        .map(( character ) => Characters[ character ] ?? Default )

    const lines = Array(11)
        .fill(null)
        .map(() => [] as Array<number> )

    for ( const character of characters )
        for ( let l = 0 ; l < lines.length ; l++ )
            lines[ l ].push( 0 , ... character[ l ] )


    const chunks = lines
        .map(( line ) => chunk(line,2) )



    const rows = chunk(chunks,2)

    return rows
        .map(( row ) => {

            let [ upper , lower = [] ] = row

            upper = upper.map(([ first , second ]) => [ first , second ?? 0 ] )
            lower = lower.map(([ first , second ]) => [ first , second ?? 0 ] )

            return upper
                .map(( pair , index ) => [ pair , lower[ index ] ?? [ 0 , 0 ] ])
                .map(( block ) => block[0][0] * 8 + block[0][1] * 4 + block[1][0] * 2 + block[1][1] )
                .map(( index ) => Blocks[ index ] )
                .join('')
        })
        .join('\n')
}

