/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/2/index.html","ff26133acdb607b19b10e46eeb166f6c"],["/3/index.html","8986f9b0dba8166daeffe4cd9e8c31c2"],["/4/index.html","4ce65d3ed744eac7ac5530a255ad0ec0"],["/404.html","a7ca39ad8f344fb10d2e66c405bf5fb1"],["/5/index.html","597f01580e489c904f4f1f5e3d5c69ba"],["/about/index.html","32cf42967864ea3dec5dc1b6fbf6e4c2"],["/assets/css/main.css","6fa75bd30bd36fc1ccdae8739cfcdae7"],["/assets/css/style.css","63c21eebe5f323508502e9745d48a775"],["/assets/img/favicon.jpg","ffb9f5c8afdda7fa4f3fd697e5147182"],["/assets/img/gallery/2022ksc1.jpg","4b7ce0275bc97089c17512832b4dae46"],["/assets/img/gallery/2023ieie1.jpg","e3cc69afa7bddf2eb95f8dba5d99b1c8"],["/assets/img/gallery/2023ieie2.jpg","1d6a207d59b1b79136e53a82b6592160"],["/assets/img/gallery/2023ieie3.jpg","561363d3f6a0a1069fd02cff3b88ac19"],["/assets/img/gallery/2023ieie4.jpg","7c5506924b8791a23c48b2360e7ca9c2"],["/assets/img/gallery/2023ieie5.jpg","10c7e6716591bc656e7f71d98fe03d64"],["/assets/img/gallery/2023ieie6.jpg","aff9eecf3628b71267f2631e2bfa7125"],["/assets/img/gallery/2023kccv1.jpg","05bdb3fe1f2f566e2fb4d8ad6c590291"],["/assets/img/gallery/2023kccv2.jpg","264ba156651f0cb862daffc10642fee5"],["/assets/img/gallery/2023kccv4.jpg","d240ee55cadedab4eaffedd98fefabc3"],["/assets/img/gallery/2023kccv5.jpg","b37b1ae5dd24b058063430ed3b3d87b8"],["/assets/img/gallery/2023kccv7.jpg","1c38db2df529dc2c263a07d6bdb10fda"],["/assets/img/gallery/2023kccv8.jpg","c88272041bb68aa80292fc8649512d70"],["/assets/img/gallery/2023workshop_1.jpg","659ddc522b7d9c9b7fbe868e54ee3915"],["/assets/img/gallery/2023workshop_10.jpg","4d832932cb8d494f9ba1dc112ef27e3c"],["/assets/img/gallery/2023workshop_3.jpg","7bba6cd79727daa42b553a30f2ba0585"],["/assets/img/gallery/2023workshop_4.jpg","06afd3c69e0d94529c300a9af6ab0bf9"],["/assets/img/gallery/2023workshop_5.jpg","fdb6e87c9c60a3311b15cdbe548edc15"],["/assets/img/gallery/2023workshop_6.jpg","b1b1beb2da4254167b0c0614e59d1f72"],["/assets/img/gallery/2023workshop_7.jpg","434c6cda47c9662581d9b92f8bd01399"],["/assets/img/gallery/2023workshop_8.jpg","f57fa677d38b358cee7fca4ae7d9aad3"],["/assets/img/gallery/2023workshop_9.jpg","30deb803ecfed8fa91d04de76976b62a"],["/assets/img/gallery/2024grad1_1.jpg","fdf89e46ebe8221e3d26ae39de8910dc"],["/assets/img/gallery/2024grad1_2.jpg","bf7d0058149ab6b76d14fa417458b475"],["/assets/img/gallery/2024grad1_3.jpg","f76a63203ed925307255a08d44fcb851"],["/assets/img/gallery/2024grad1_4.jpg","e03469fb2cb6e95b985ec632a30797c6"],["/assets/img/gallery/2024grad1_5.jpg","0ca0092dc3bf7d19a1402f73f63813a2"],["/assets/img/gallery/2024grad1_6.jpg","1807ac6a7a7c5e16f60c4272259acd72"],["/assets/img/gallery/2024grad1_7.jpg","c8eaa2206031f43254680db2d2461791"],["/assets/img/gallery/2024grad1_8.jpg","364b6d4866b046b200ff3c2787179ad4"],["/assets/img/gallery/2024grad1_9.jpg","0ee7d99c95adfec4c63c90f6b0345a55"],["/assets/img/gallery/2024icra11.jpg","cd9a55dad551e267b5f0f50b91c56759"],["/assets/img/gallery/2024icra12.jpg","0d04e57c1ae73b79433595d1e3bd26d2"],["/assets/img/gallery/2024ieie1_4.jpg","b830110ef07689e5b8aecffe2eff1b3a"],["/assets/img/gallery/2024ieie1_5.jpg","82e29d5c2f85692e79e64602d8b5ebe0"],["/assets/img/gallery/2024ieie1_6.jpg","233737cd2c561ae5f7cdfc6609d92ff6"],["/assets/img/gallery/2024ipiu1.jpg","6280edca33e403d8b3198ab81533a2fb"],["/assets/img/gallery/2024ipiu10.jpg","d0c88a1ef2ba14efe817eab1c751585a"],["/assets/img/gallery/2024ipiu2.jpg","f6cb3008cc5df0fc009b7888e7a98eaa"],["/assets/img/gallery/2024ipiu3.jpg","38a4d312debe8c1b19b1e9428cd09203"],["/assets/img/gallery/2024ipiu4.jpg","cda9992210c733eb92d69797948eec13"],["/assets/img/gallery/2024ipiu5.jpg","a59180fd0a299edc621297ca3fb0a102"],["/assets/img/gallery/2024ipiu6.jpg","ec481e9fb6f61b9a168cdd974c34c7ac"],["/assets/img/gallery/2024ipiu7.jpg","43698e093a391775ab6b99c8be34344c"],["/assets/img/gallery/2024ipiu9.jpg","affa345ac7b89a9c5b58b62dbe86965b"],["/assets/img/gallery/2024kccv4.jpg","3939b0cf0f94b190b6856763f2d79bc4"],["/assets/img/gallery/2024kjccs1.jpg","a3b443828742c90a850a24dc4d530e09"],["/assets/img/gallery/2024kjccs2.jpg","8195db13ad7e14a8b0665c4a6294aead"],["/assets/img/gallery/2024kjccs4.jpg","2603626ce71110877feae21a2cec74fb"],["/assets/img/gallery/2024kjccs5.jpg","e7db599448b6595cf3d0c156acdd9d1c"],["/assets/img/gallery/2024sc1.jpg","25c86831d8614ac332826e76b7eacc78"],["/assets/img/gallery/221118_TeamVIP_ADAI.jpg","2cb2d38c7361d9f5feb529d99deed65d"],["/assets/img/gallery/240626_IEIE_Summer_2024.png","e91876a6af243bca82f23e832bb6463d"],["/assets/img/gallery/240813_KCCV_2024.png","e85df8e4264cebb5763799b9cf0114cc"],["/assets/img/gallery/blossom_lunch.jpg","db218df719e530c559ad01a1a3607c5f"],["/assets/img/gallery/blossom_lunch2.jpg","82d63f8c7462a494f03d62d80e21520c"],["/assets/img/gallery/cvpr10.jpg","c1fd410ff0d76ccc0ae7c4f100d29a70"],["/assets/img/gallery/cvpr11.jpg","b073e5c8771e95912b5ea26c7f153e6b"],["/assets/img/gallery/cvpr12.jpg","5cc9c098df59f00d9a8fdc622a2386c6"],["/assets/img/gallery/cvpr13.jpg","eda12fa1b1eb618cf386bf23f3a555f4"],["/assets/img/gallery/cvpr14.jpg","f6d4c53ae721f124a95d51322476cfb7"],["/assets/img/gallery/cvpr19.jpg","91e863e31a4125637bd286957988059b"],["/assets/img/gallery/cvpr20.jpg","a3613e38ade6c4249a5542ed2a5b9dd7"],["/assets/img/gallery/cvpr30.jpg","7b612014ea645ec8f5d8078bb8bde001"],["/assets/img/gallery/cvpr31.jpg","195b7c12de05287acaec1864cf9f0cb1"],["/assets/img/gallery/cvpr36.jpg","007e167c942dad62923314b47eba23af"],["/assets/img/gallery/cvpr4.jpg","82c884c25a5621cbb7b4a863b111113f"],["/assets/img/gallery/cvpr5.jpg","1fbc6b3ea4167774fae435ccf0c6ceef"],["/assets/img/gallery/cvpr6.jpg","0b9123e16106c789650f1c683c5cd27b"],["/assets/img/gallery/cvpr7.jpg","90353c8d692909e106a21bc557d7e5f1"],["/assets/img/gallery/cvpr9.jpg","17573cf54d4a328427f5a703f1684233"],["/assets/img/gallery/thumbnail.jpg","268aa20013e56c6404f449986a25966f"],["/assets/img/icons/android-chrome-192x192.png","4df4c8779d47bcaa69516050281773b9"],["/assets/img/icons/android-chrome-256x256.png","939ec88a61f407945a27d867fca1651d"],["/assets/img/icons/apple-touch-icon.png","366666899d15cf8f6811cc73ee0d63de"],["/assets/img/icons/favicon-16x16.png","f625044491b20a5df78571ba266cbcf6"],["/assets/img/icons/favicon-32x32.png","67502381e45848a4ab76123364675ffe"],["/assets/img/icons/icon-github.svg","4e06335104a29f91e08d4ef420da7679"],["/assets/img/icons/icon-instagram.svg","1e1119e2628235ee4c8771bff15eb2ca"],["/assets/img/icons/icon-twitter.svg","30551913d5399d6520e8a74b6f1e23f0"],["/assets/img/icons/mstile-150x150.png","1cea2ceb806d1a018330a51a1d8b73b6"],["/assets/img/icons/safari-pinned-tab.svg","398ef6b25c0f7f3f6e54c112a8facc5f"],["/assets/img/posts/221118_TeamVIP_ADAI.jpg","2cb2d38c7361d9f5feb529d99deed65d"],["/assets/img/posts/221118_TeamVIP_ADAI_lg.jpg","2cb2d38c7361d9f5feb529d99deed65d"],["/assets/img/posts/221118_TeamVIP_ADAI_md.jpg","2cb2d38c7361d9f5feb529d99deed65d"],["/assets/img/posts/221118_TeamVIP_ADAI_placehold.jpg","2cb2d38c7361d9f5feb529d99deed65d"],["/assets/img/posts/221118_TeamVIP_ADAI_sm.jpg","2cb2d38c7361d9f5feb529d99deed65d"],["/assets/img/posts/221118_TeamVIP_ADAI_thumb.jpg","2cb2d38c7361d9f5feb529d99deed65d"],["/assets/img/posts/221118_TeamVIP_ADAI_thumb@2x.jpg","2cb2d38c7361d9f5feb529d99deed65d"],["/assets/img/posts/221118_TeamVIP_ADAI_xs.jpg","2cb2d38c7361d9f5feb529d99deed65d"],["/assets/img/posts/230410_Sciport.jpg","30379918406ce6a9f4b863542520af5a"],["/assets/img/posts/230410_Sciport_lg.jpg","30379918406ce6a9f4b863542520af5a"],["/assets/img/posts/230410_Sciport_md.jpg","30379918406ce6a9f4b863542520af5a"],["/assets/img/posts/230410_Sciport_placehold.jpg","30379918406ce6a9f4b863542520af5a"],["/assets/img/posts/230410_Sciport_sm.jpg","30379918406ce6a9f4b863542520af5a"],["/assets/img/posts/230410_Sciport_thumb.jpg","30379918406ce6a9f4b863542520af5a"],["/assets/img/posts/230410_Sciport_thumb@2x.jpg","30379918406ce6a9f4b863542520af5a"],["/assets/img/posts/230410_Sciport_xs.jpg","30379918406ce6a9f4b863542520af5a"],["/assets/img/posts/230410_SignLanguage.jpg","743e4e399965c66a3fb2433bdc2ad33d"],["/assets/img/posts/230410_SignLanguage_lg.jpg","743e4e399965c66a3fb2433bdc2ad33d"],["/assets/img/posts/230410_SignLanguage_md.jpg","743e4e399965c66a3fb2433bdc2ad33d"],["/assets/img/posts/230410_SignLanguage_placehold.jpg","743e4e399965c66a3fb2433bdc2ad33d"],["/assets/img/posts/230410_SignLanguage_sm.jpg","743e4e399965c66a3fb2433bdc2ad33d"],["/assets/img/posts/230410_SignLanguage_thumb.jpg","743e4e399965c66a3fb2433bdc2ad33d"],["/assets/img/posts/230410_SignLanguage_thumb@2x.jpg","743e4e399965c66a3fb2433bdc2ad33d"],["/assets/img/posts/230410_SignLanguage_xs.jpg","743e4e399965c66a3fb2433bdc2ad33d"],["/assets/img/posts/231030_ADAI.jpg","7c073df1c20f0f00b5ba87ad2527c367"],["/assets/img/posts/231030_ADAI_lg.jpg","7c073df1c20f0f00b5ba87ad2527c367"],["/assets/img/posts/231030_ADAI_md.jpg","7c073df1c20f0f00b5ba87ad2527c367"],["/assets/img/posts/231030_ADAI_placehold.jpg","7c073df1c20f0f00b5ba87ad2527c367"],["/assets/img/posts/231030_ADAI_sm.jpg","7c073df1c20f0f00b5ba87ad2527c367"],["/assets/img/posts/231030_ADAI_thumb.jpg","7c073df1c20f0f00b5ba87ad2527c367"],["/assets/img/posts/231030_ADAI_thumb@2x.jpg","7c073df1c20f0f00b5ba87ad2527c367"],["/assets/img/posts/231030_ADAI_xs.jpg","7c073df1c20f0f00b5ba87ad2527c367"],["/assets/img/posts/231203_PNUAI_prj.jpg","4bc9326f15c1a0877c9af7c868b2c04a"],["/assets/img/posts/231203_PNUAI_prj_lg.jpg","4bc9326f15c1a0877c9af7c868b2c04a"],["/assets/img/posts/231203_PNUAI_prj_md.jpg","4bc9326f15c1a0877c9af7c868b2c04a"],["/assets/img/posts/231203_PNUAI_prj_placehold.jpg","4bc9326f15c1a0877c9af7c868b2c04a"],["/assets/img/posts/231203_PNUAI_prj_sm.jpg","4bc9326f15c1a0877c9af7c868b2c04a"],["/assets/img/posts/231203_PNUAI_prj_thumb.jpg","4bc9326f15c1a0877c9af7c868b2c04a"],["/assets/img/posts/231203_PNUAI_prj_thumb@2x.jpg","4bc9326f15c1a0877c9af7c868b2c04a"],["/assets/img/posts/231203_PNUAI_prj_xs.jpg","4bc9326f15c1a0877c9af7c868b2c04a"],["/assets/img/posts/240626_IEIE.jpg","4f2371b58d61d6a7f9b19b1f68fb95c4"],["/assets/img/posts/240626_IEIE_lg.jpg","4f2371b58d61d6a7f9b19b1f68fb95c4"],["/assets/img/posts/240626_IEIE_md.jpg","4f2371b58d61d6a7f9b19b1f68fb95c4"],["/assets/img/posts/240626_IEIE_placehold.jpg","4f2371b58d61d6a7f9b19b1f68fb95c4"],["/assets/img/posts/240626_IEIE_sm.jpg","4f2371b58d61d6a7f9b19b1f68fb95c4"],["/assets/img/posts/240626_IEIE_thumb.jpg","4f2371b58d61d6a7f9b19b1f68fb95c4"],["/assets/img/posts/240626_IEIE_thumb@2x.jpg","4f2371b58d61d6a7f9b19b1f68fb95c4"],["/assets/img/posts/240626_IEIE_xs.jpg","4f2371b58d61d6a7f9b19b1f68fb95c4"],["/assets/img/posts/240701_LGE_Members.jpg","a880c6460bc44f4523893a77fb131fa9"],["/assets/img/posts/240701_LGE_Members_lg.jpg","a880c6460bc44f4523893a77fb131fa9"],["/assets/img/posts/240701_LGE_Members_md.jpg","a880c6460bc44f4523893a77fb131fa9"],["/assets/img/posts/240701_LGE_Members_placehold.jpg","a880c6460bc44f4523893a77fb131fa9"],["/assets/img/posts/240701_LGE_Members_sm.jpg","a880c6460bc44f4523893a77fb131fa9"],["/assets/img/posts/240701_LGE_Members_thumb.jpg","a880c6460bc44f4523893a77fb131fa9"],["/assets/img/posts/240701_LGE_Members_thumb@2x.jpg","a880c6460bc44f4523893a77fb131fa9"],["/assets/img/posts/240701_LGE_Members_xs.jpg","a880c6460bc44f4523893a77fb131fa9"],["/assets/img/posts/241205_IEIE.jpg","78033023d48fa89ea4aeed4a79d084cf"],["/assets/img/posts/241205_IEIE_lg.jpg","78033023d48fa89ea4aeed4a79d084cf"],["/assets/img/posts/241205_IEIE_md.jpg","78033023d48fa89ea4aeed4a79d084cf"],["/assets/img/posts/241205_IEIE_placehold.jpg","78033023d48fa89ea4aeed4a79d084cf"],["/assets/img/posts/241205_IEIE_sm.jpg","78033023d48fa89ea4aeed4a79d084cf"],["/assets/img/posts/241205_IEIE_thumb.jpg","78033023d48fa89ea4aeed4a79d084cf"],["/assets/img/posts/241205_IEIE_thumb@2x.jpg","78033023d48fa89ea4aeed4a79d084cf"],["/assets/img/posts/241205_IEIE_xs.jpg","78033023d48fa89ea4aeed4a79d084cf"],["/assets/img/posts/emile-perron-190221.jpg","4705474281b975b7a213b96e71f772e7"],["/assets/img/posts/emile-perron-190221_lg.jpg","aafe35b1dc6d9dc9293c8c2ef4121046"],["/assets/img/posts/emile-perron-190221_md.jpg","03ed35ed656429599daba312f0990a0f"],["/assets/img/posts/emile-perron-190221_placehold.jpg","67f40708f69ab671cee04d624258b85c"],["/assets/img/posts/emile-perron-190221_sm.jpg","4ce4178a62d5a456e90e7bc47bde50f5"],["/assets/img/posts/emile-perron-190221_thumb.jpg","f20085dfe2e36854f8a12f1fd6c50425"],["/assets/img/posts/emile-perron-190221_thumb@2x.jpg","b8fa22c3237de529316037f093b9cb4d"],["/assets/img/posts/emile-perron-190221_xs.jpg","ac32cbd525d72e932499668af5647d03"],["/assets/img/posts/shane-rounce-205187.jpg","bb774d6e05b2b55ffdabe11a8aac7c56"],["/assets/img/posts/shane-rounce-205187_lg.jpg","83cd838024fff9c3faec59fa1da97872"],["/assets/img/posts/shane-rounce-205187_md.jpg","628cf27bf658cf6de9df79ab9bf2cb2d"],["/assets/img/posts/shane-rounce-205187_placehold.jpg","249fc4a09bcfcbd7d5764f14c14ae82e"],["/assets/img/posts/shane-rounce-205187_sm.jpg","a2400a468e10d7d64528ac9c6bc3b6f0"],["/assets/img/posts/shane-rounce-205187_thumb.jpg","c3b2dd0d95a6d3a44d7702f8c06b1e78"],["/assets/img/posts/shane-rounce-205187_thumb@2x.jpg","b0722b63a92c92a44cd92c0201fc92a4"],["/assets/img/posts/shane-rounce-205187_xs.jpg","cd58fd23f3b3c1de2183beb9ed08327b"],["/assets/img/posts/sleek.jpg","a32252a618ffe8ae57c9ce9ab157a01b"],["/assets/img/posts/sleek_lg.jpg","95a1338aa524727f34950f269133e904"],["/assets/img/posts/sleek_md.jpg","4e35ceb2f5fffd3d758fade699b0b85a"],["/assets/img/posts/sleek_placehold.jpg","0f48050cd7776895b98c6ce21597ff39"],["/assets/img/posts/sleek_sm.jpg","f30af3d30b7df905d962e494750f5da0"],["/assets/img/posts/sleek_thumb.jpg","f7b8a94ac9da8e5ea36bb9e459872400"],["/assets/img/posts/sleek_thumb@2x.jpg","e67e2129dc58a100b98a5e027c964dbc"],["/assets/img/posts/sleek_xs.jpg","c8212cace6d446950556a3bf6efe4520"],["/assets/img/publication/AAAI24_CMDA.png","111ae3d4a0a8aa90eb5fabe245d23d21"],["/assets/img/publication/ACCV22_DCP.png","5398534b22506a4d15935d9446e824c1"],["/assets/img/publication/ACCV24_CMCV.png","159fed150ae1b7e109eb045ea0456ab8"],["/assets/img/publication/ACCV24_ULTRON.png","49470262323b219015a9ea23817e2633"],["/assets/img/publication/Access22_PSDataset.png","17545890e3eeda46e833de8138022510"],["/assets/img/publication/CVIU22_MCCalib.png","81fed6311ab5524a8e6668431b834890"],["/assets/img/publication/CVPR15_Teaser.png","95af256959871dbafad6146924578a06"],["/assets/img/publication/CVPR17_Teaser.png","d1c3e49dc99c03838a42c1dd36e1579c"],["/assets/img/publication/CVPR20_RefSR.png","2a977e955d37eea672f521f7f2ab785c"],["/assets/img/publication/CVPR23_ThermalDepth.png","5b2062f34cab1f125b3e40752540f71e"],["/assets/img/publication/CVPRW17_Teaser.png","7b06ab97926af27db44e89b5fe1001bf"],["/assets/img/publication/ECCV20_NLSPN.png","522ff883d2227f69dc2ae712a24727ef"],["/assets/img/publication/Electronics21_Steganography.png","8f00395bb0d28ccb49ba16fc0efa6488"],["/assets/img/publication/Electronics22_RefSR.png","9e275a9800577af949bb70f1aedce82f"],["/assets/img/publication/FCV17_Teaser.png","e20910ae6d7c27b622e8ee3d41a7f815"],["/assets/img/publication/FCV18_Best_Demo_Award.png","4eb7d32096e006a797574320b92539b9"],["/assets/img/publication/FCV18_Teaser.png","d7ab61bed408c38f1bd03497e3e02b64"],["/assets/img/publication/ICCV17_Teaser.png","877e0d03ad8b79da10bf537f2bea510f"],["/assets/img/publication/IJCV22_SeeThrough.png","fc17bfae9ee062c233502f0d58d9172f"],["/assets/img/publication/IROS19_AE.png","d71a25c1bac96c441f0a743af2af9983"],["/assets/img/publication/IROS19_Sensor.png","34a2c80c48bd19f44ef131ddab095da5"],["/assets/img/publication/OE22_MiniPS.png","d85623f172437e751b3609290b227f14"],["/assets/img/publication/PRL18_Teaser.png","23bc97a3aaea92eb031d0c7a99bfd5d5"],["/assets/img/publication/PRL24_CrossFormer.png","2296cd5a678e7e84d4e7e3b43b5fd104"],["/assets/img/publication/RAL24_ADNet.png","930a5cd30b86cd8697d82e8a5461b866"],["/assets/img/publication/RAL24_IAM.png","436609cc3d4da638de76df01ca0480a1"],["/assets/img/publication/RAL_ICRA22_MMDCE.png","bf5ae3aed2599b30ac0f615059e233cd"],["/assets/img/publication/RAL_IROS21_MS_UDA.png","8dc59826f3431c3d7fd937d231108867"],["/assets/img/publication/SPL20_SPKD.png","119120c6221341bce718a253b8fde8e4"],["/assets/img/publication/SPL21_LLKD.png","491aa26a22fb327508becb2c6636e269"],["/assets/img/publication/Sensors22_LSPKD.png","5d8d070bd47ce851a88842fcd00dcd1e"],["/assets/img/publication/TPAMI18_PS_RF_Teaser.png","0c125728759057cb803d170fc499a028"],["/assets/img/publication/URAI16_Teaser.png","c6f551c6818816568df2cdd6187d1459"],["/assets/img/publication/WACV20_PASSD.png","97e05e9077848ed4083544b87f165da7"],["/assets/img/publication/jspark.png","cd22da74d7da4c6be3f96476fe1974b8"],["/assets/img/research/semantic_segmentation.png","3c01677779dce4443acc53ee98baec14"],["/assets/img/research/super_resolution.png","2bdb8dc329a66f32e2b7e3ee7592d3e9"],["/assets/img/team/beomsoo_kim.jpg","062c0c1c6b31916834a02ea8a0739141"],["/assets/img/team/changjin_lee.png","1bed699e0131d07d4c1d96e6ca07c0bf"],["/assets/img/team/chanill_park.jpg","2595159a979ea88dc997c83924829a95"],["/assets/img/team/dogyu_kim.jpg","f004ce574267704de2a0adfed963099c"],["/assets/img/team/dummy.jpg","f5bf3c851202c48c9e8cc391fd09006b"],["/assets/img/team/haneol_choi.jpg","48695454bfdec07ba4c38fa19f31d708"],["/assets/img/team/heeju_han.jpg","2babb600d919385d0dc77f8c3d522542"],["/assets/img/team/heejung_jung.jpg","0781a6228f1246d3d10a482e274a5fef"],["/assets/img/team/hyunsu_park.jpg","955466104f21e613bb2b9961d43adc65"],["/assets/img/team/incheol_park.jpg","11a201cffd26511ffd8abd788117c0e3"],["/assets/img/team/jaehyeong_park.jpg","7e93a30aab37d7dd4388116bed88af0d"],["/assets/img/team/janghyun_kim.jpg","e2128b7ae901b237189ccff306f8e7ac"],["/assets/img/team/jeonghyun_noh.jpg","abe113711aabd8c165f86149c4fd93fa"],["/assets/img/team/jinwan_kim.jpg","6c1c82e87b97b8e83d63e6596a9247d5"],["/assets/img/team/mingyu_jeong.jpg","9eb78c200afbc4bd149da7df00ae3f6d"],["/assets/img/team/minseong_kweon.jpg","2e6bf4758178c92b3d7cab19c5b91b52"],["/assets/img/team/minsu_jeon.jpg","e79ec38ad7a29f88b8c8734fb064e37c"],["/assets/img/team/prof.jpg","f204e2e7e7bae980a8698efda3666266"],["/assets/img/team/seokyong_heo.jpg","5acc2327c68b5a0a61e4146973dab7fa"],["/assets/img/team/seongheon_ha.jpg","9bd54bedd16c24e31dc2cd5b02002c30"],["/assets/img/team/seunghyeon_cheon.jpg","abdfdacf5972f6cc70de0372ede5adde"],["/assets/img/team/seungik_lee.jpg","e4534d208c066049de566371b8f1cf95"],["/assets/img/team/subin_lee.jpg","404c348db7da982bb591223f1c354fe9"],["/assets/img/team/yeogyeong_kim.jpg","77980a883abe824cc8ed9a21fd0d2c4d"],["/assets/img/team/yeongmin_ko.jpg","6cd65a05a934ac406c07c5ba45f7fb12"],["/assets/img/team/yerin_nam.jpg","a0c8ac898e83f7966e3e16c35719f30b"],["/assets/img/team/yonghyeon_jo.jpg","c0c11b1d87a052496722be85a4b96726"],["/assets/js/bundle.js","ff871e9e292bfcd393cf1996b5e9284a"],["/categories/index.html","b2fc7ac66a9312b5aaadc4c8e6a0bc65"],["/contact/index.html","fd8a47b63b37db5cab4b7a0e40279c86"],["/etc/2016-05-20-super-long-article.html","50254874800a0bbdb5e8ea9068d90de0"],["/etc/2016-05-20-welcome-to-jekyll.html","d4c91dc54517d35ee1c475adc2e1aa6c"],["/etc/2017-10-15-markdown-cheatsheet.html","154647dcc1f8fe7f89ed1c9af9e59503"],["/etc/2017-11-26-getting-started.html","dcf15459fd40029dc4003c34bc68fa04"],["/gallery/index.html","75d34a2ac0a36e54f9d6ee9faff1ae03"],["/gulpfile.babel.js","499ef2edde6e9b4fbafcb7c6f0cbc725"],["/index.html","e0e732f33cee7e2857af731affd61264"],["/lecture/index.html","eefdae8a62c5d5bcd4a52c3e90a644ab"],["/news/2021/09/28/210928_news.html","062ccb7bd54c7192dc30b56df40d23d3"],["/news/2021/12/13/211213_spl_llkd.html","2441fc3b12d5b9702dc2f1c50927fec6"],["/news/2022/01/04/220104_ijcv_seethrough.html","b8f80c00ef58e04468ac2f363070c300"],["/news/2022/01/12/220112_cviu_mccalib.html","24539d3686716c122d1e150b5bc2ca0c"],["/news/2022/02/01/220201_ral_icra_mmdce.html","a43d3a9664caf352c03ad20191aaa1a3"],["/news/2022/03/02/220302_new_members.html","b5e557656ef77f5804c324729bc4d987"],["/news/2022/09/01/220901_new_members.html","207a7182dc7cb7ea479d7b9e87a86948"],["/news/2022/09/17/220917_accv.html","34968bcca40d5d5671bd13fe90fddff5"],["/news/2022/09/22/220922_oe.html","3fda330eea0657c1af48eb79af373644"],["/news/2022/09/22/220922_sensors.html","f28b1f96a2ce68d49b9b5553240dfe4a"],["/news/2022/10/09/221009_access.html","44d2acb724fb84f6b4b7134e0f3981dd"],["/news/2022/11/18/221118_adai.html","a0851127aadf1ff99a6f86ca3308b881"],["/news/2023/03/01/230301_new_members.html","b898188ef996149560050fc6795a1fc3"],["/news/2023/03/02/230302_cvpr.html","90e6a70e7acf522743a89fe37f61a3f8"],["/news/2023/04/10/230410_signlanguage.html","8458b3375cdc4b58515ebb290bb61d53"],["/news/2023/09/01/230901_new_members.html","3d179ae8a0e6016c067480af8fd7b48f"],["/news/2023/10/30/231030_adai.html","a84b9a019738112ec5481b813324d584"],["/news/2023/12/03/231203_pnuai_student_project.html","aa01bddd34f6470db9fb80b734ce921f"],["/news/2023/12/09/231209_aaai.html","4d4ac62a7bf5253e3a6d819c453760c8"],["/news/2024/02/13/240213_prl.html","8669a9d1b073be4e9e81032d614b5d72"],["/news/2024/03/01/240301_new_members.html","826e81e895b5c1bd36a7daacd88849f4"],["/news/2024/06/20/240620_ral.html","f9fc1478596d8a59280e997ae218311b"],["/news/2024/06/26/240626_IEIE.html","fad69551cb4aa4ef35bd9c474c3757a6"],["/news/2024/07/01/240701_LGE_Members.html","753bab4474d2629a11433eac09340f45"],["/news/2024/09/01/240901_new_members.html","a24b3183042928ebdc56062c2f8b5ab1"],["/news/2024/09/25/240925_accv.html","ca63d321d49d1881ba0be6979d87c80d"],["/news/2024/12/05/241205_IEIE.html","4386d2837f062ecb8529f8b242d36373"],["/news/2025/01/23/250123_iclr.html","1d835fef97e81fb3ca55c67dad3a44bc"],["/news/2025/03/01/250301_new_members.html","fd8c4bf03742a9292cbefae24809d743"],["/notice/2021/12/14/211214_recruit.html","46eb3f978dee8cbfec0e44b6dd374c90"],["/notice/2022/09/01/220901_recruit.html","b06111cfa43bda8588f4bb7f7462c024"],["/notice/2023/03/03/230303_recruit.html","49033f0d5ed8e471eb140858f73af42f"],["/publication/index.html","1391aa78f145db42148dff4cc15bb4eb"],["/research/index.html","67cc82b1ababf3babea2f3909c38d3e5"],["/sw.js","f1e6706d39d6cfe86f2444c1a6cf3106"],["/team/index.html","5e42415718e0a33e42940cdc4b689804"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function(originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function(originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function(originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function(whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function(originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







