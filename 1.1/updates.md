## General
<<<<<<< HEAD
<<<<<<< master
<<<<<<< master
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

=======
^ A couple corrections
>>>>>>> Updated

## [essence](essence.js)
\+ String.countWord(), asyncTime(), perMode and profiling logs
=======
<<<<<<< HEAD
^ Updated the dependencies of each modules

## [essence](essence.js)
+ Moved the multi-node logic of Element.setCSS() to Element.setInlineCSS() and improved Element.setCSS()
=======
^ A couple corrections

## [essence](essence.js)
\+ String.countWord(), asyncTime(), perMode and profiling logs
>>>>>>> develop
>>>>>>> Conflict fixed

^ Added the multi-node support to Element.attr() and Element.rmAttr()

=======
<<<<<<< HEAD
<<<<<<< HEAD
^ Updated the dependencies of each modules

## [essence](essence.js)
+ Moved the multi-node logic of Element.setCSS() to Element.setInlineCSS() and improved Element.setCSS()
=======
=======
>>>>>>> develop
^ A couple corrections

## [essence](essence.js)
\+ String.countWord(), asyncTime(), perMode and profiling logs
<<<<<<< HEAD
>>>>>>> develop
=======
>>>>>>> develop

^ Added the multi-node support to Element.attr() and Element.rmAttr()

>>>>>>> develop
\+ Added Module.getUsage()
## [Ajax](modules/Ajax.js)


## [DataStruct](modules/DataStruct.js)
<<<<<<< HEAD
<<<<<<< master
\+ (N)TreeNode.count(), DOMA, DomList()

^ NTreeNode.find()

^ Fixed the key-instead-of-value bug in NTreeNode.toString()

^ Fixed a typo in TreeNode.printBFS()

^ Placed common logic of DomTree(), DomStructure() into DOMA
>>>>>>> develop
=======
\+ TableSort(), sortNamedSort()
>>>>>>> Conflict fixed
=======
\+ TableSort(), sortNamedSort()
>>>>>>> develop

## [DOM](modules/DOM.js)
^ Added a restore option in noRightClick(), documented simplifyCSSPath()

## [Files](modules/Files.js)
 

## [Maths](modules/Maths.js)
<<<<<<< HEAD
+ 
=======

>>>>>>> develop

## [Misc](modules/Misc.js)
 \+ rmUniques()

^ moduleList()
## [Security](modules/Security.js)
 

## [UI](modules/UI.js)
<<<<<<< HEAD
<<<<<<< master
<<<<<<< HEAD
\+ getColourType() which supports: hex, rgb(a), hsl(a), hsv(a) and hsb(a);

^ daynightMode now manipulates the entire DOM and acts on a more appropriate time range

## [Web](modules/Web.js)
+

## [QTest](modules/QTest.js)
^ Fixed a typo in InvalidExpressionError
=======
\+ clrToArr() (along with it's implementation in the appropriate places in UI.js), getLuminance()
=======
\+ clearCSSRules(), findCSSRules(), getCSS()
>>>>>>> Conflict fixed
=======
\+ clearCSSRules(), findCSSRules(), getCSS()
>>>>>>> develop

\+ syncCSS(), addCSSRule(), clearCSSRule()

\+ syncCSS(), addCSSRule(), clearCSSRule()

## [Web](modules/Web.js)


## [QTest](modules/QTest.js)
<<<<<<< HEAD
<<<<<<< master
<<<<<<< master
>>>>>>> develop
=======
=======
>>>>>>> Conflict fixed
=======
>>>>>>> develop
\+ UnitTest.assert()

^ UnitTest.basicTests(), UnitTest.test(), UnitTest.testFalse(), UnitTest.multiTest()

<<<<<<< HEAD
<<<<<<< master
^ renamed UnitTest.bad into UnitTest.fail
>>>>>>> Updated
=======
^ renamed UnitTest.bad into UnitTest.fail
>>>>>>> Conflict fixed
=======
^ renamed UnitTest.bad into UnitTest.fail
>>>>>>> develop
