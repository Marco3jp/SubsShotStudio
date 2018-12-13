#!/bin/bash

cat app.ts | sed -e "s/font-size:65px;letter-spacing:1px/font-size:\${styleData.subsFontSize};letter-spacing:\${styleData.subsLetterSpacing}/g" -e "s/position:fixed;background-color:rgba(66,66,66,.5)/position:fixed;background-color:\${styleData.subsBackgroundColor}/g" -e "s/padding:10px 20px/padding:\${styleData.subsPaddingVertical} \${styleData.subsPaddingHorizontal}/g" > app.ts.bak
mv app.ts.bak app.ts
