
=== Pau CreateJS Block ===
Author: Timothy Paustian
Author URI: https://textbookconsortia.com/about-the-author/
Contributors: tdpaustian
Donate link:
Tags:  post, page, gutenberg
Requires at least: 6.8
Tested up to: 6.9
Stable tag: 0.2.0
Requires PHP: 7.4
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html
A Gutenberg block plugin to display animations created using html5 and the CreateJS library.

== Description ==
This plugin is a Gutenberg block that allows the posting of html5 animations created with CreateJS inside any Post or
Page. You define the width and height of the area for the animation and point to the location of the JavaScript.
The plugin does the rest.

== External Libraries ==
The plug includes the CreateJS library (https://code.createjs.com/1.0.0/createjs.min.js). CreateJS is open source,
MIT license (https://github.com/CreateJS/EaselJS/blob/master/LICENSE.txt), and its privacy policy
(https://createjs.com/legal/privacy.html) states that they do not collect any data. This library is required to run
the animations.

== Installation ==
1. In your WordPress Dashboard, navigate to "Plugins" and then click on the "Add Plugins" button.
2. Search for "Create JS Block".
3. Install the plugin by pressing the "Install" Button.
4. Activate the plugin by pressing the "Activate" button.

Once installed and activated, use the plugin as you would any block. Create a Post or Page. Add a block and search for
CreateJS. On the sidebar, define the location of the JavaScript used to control the animation relative to your content
directory. Define the width and height of the canvas for the animation. If your JavaScript is functional, you should
see your animation playing in the block. You can also add accompanying text to the animation.

For more information about CreateJS html5 animations, check out the CreateJS website (https://createjs.com/). If you
want to see an example of this used on a live site, check out this animation that demonstrates
Enzymes as Biological Catalysts (https://textbookconsortia.com/enzymes-are-biological-catalysts/).

== Source Code ==
The Pau CreateJS Block is a Gutenberg block created as recommended in the Block Editor Handbook
(https://developer.wordpress.org/block-editor/). As recommended by the handbook, the source code is minified by the
build process for production. In keeping with the spirit of open source, the unminified code
for Pau Create JS is available at GitHub (https://github.com/paustian/pau-createjs-block/tree/main).

== Minimum Requirements ==
* WordPress version 6.8 or greater.
* PHP version 7.0.0 or greater
* MySQL version 5.7 or greater.
## Recommended Requirements
* Latest WordPress version.
* PHP version 8.0 or greater.
* MySQL version 8.0 or greater, or MariaDB 10.5 or greater.

== Frequently Asked Questions ==
Will this block help me write CreateJS animations?
This block will allow the placement of CreateJS animations in WordPress blocks, but does not provide an interface for
writing CreateJS animations. Please go to the CreateJS website to learn how to create html5 animations.

My AdobeAnimate CreateJS animation fails in the editor but looks fine in the production site. Why?
AdobeAnimate, especially old AdobeAnimate JavaScript, assumes a global context. The WordPress editor uses an iframe.
Because of this, AdobeAnimate scripts often do not render correctly in the editor. They do work fine when rendered in
the public page where CreateJS blocks are included. This is a problem with AdobeAnimate, not this CreateJS block.
== Changelog ==
0.2.0
Initial candidate release of the plugin
