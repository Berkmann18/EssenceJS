## General
<<<<<<< HEAD
^ Documentation

^ Fixed the mistypes on the Type checkers/getters throughout the project.

## [essence](essence.js)
^ Element.invColour(), added an empty color/background-color support

^ Made isType() and isCustomType() dependent on their counterparts and suppressed the case manipulation to remove complexity and prevent erroneous valid code

^ Element.css() is now compatible with elements based on NodeLists such as $e("*...")

\+ Element.selector

^ Element.setCSS() now properly checks for NodeLists instead for hopping for arrays which will never happen

## [Ajax](modules/Ajax.js)
+ 

## [DataStruct](modules/DataStruct.js)
^ getOrder() now display all the child instead of just the direct ones from the caller
=======


## [essence](essence.js)
\+ String.countWord(), asyncTime()

^ Changed the parameter order in timeUp()

## [Ajax](modules/Ajax.js)


## [DataStruct](modules/DataStruct.js)
\+ (N)TreeNode.count(), DOMA, DomList()

^ NTreeNode.find()

^ Fixed the key-instead-of-value bug in NTreeNode.toString()

^ Fixed a typo in TreeNode.printBFS()

^ Placed common logic of DomTree(), DomStructure() into DOMA
>>>>>>> develop

## [DOM](modules/DOM.js)
\+ simplifiedCSSPath()

## [Files](modules/Files.js)
 

## [Maths](modules/Maths.js)
<<<<<<< HEAD
+ 
=======

>>>>>>> develop

## [Misc](modules/Misc.js)
 

## [Security](modules/Security.js)
 

## [UI](modules/UI.js)
<<<<<<< HEAD
\+ getColourType() which supports: hex, rgb(a), hsl(a), hsv(a) and hsb(a);

^ daynightMode now manipulates the entire DOM and acts on a more appropriate time range

## [Web](modules/Web.js)
+

## [QTest](modules/QTest.js)
^ Fixed a typo in InvalidExpressionError
=======
\+ clrToArr() (along with it's implementation in the appropriate places in UI.js), getLuminance()

^ Optimised isDark()

## [Web](modules/Web.js)


## [QTest](modules/QTest.js)
>>>>>>> develop
