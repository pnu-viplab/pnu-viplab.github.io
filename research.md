---
layout: page
title: Research
permalink: /research/
---



<span style="font-size: larger;">**Visual Intelligence and Perception Lab.** aims to develop **computer vision** and **machine learning** algorithms for **real-world applications**. Here we present some of research topics we are interested, but our vision is not limited to them.</span>  

<br>

## 3D Depth Perception

![DepthPerception](../assets/img/research/depth_perception.gif){:style="width: 100%;"}

The objective of depth estimation is to generate dense depth predictions based on various input information, such as a single RGB image, multi-view images, sparse LiDAR measurements, and so on. Depth perception has become an important problem in recent years with the rapid growth of computer vision applications, such as augmented reality, unmanned aerial vehicle control, autonomous driving, and motion planning. To obtain a reliable depth prediction, information from various sensors is utilized, _e.g._, RGB cameras, radar, LiDAR, and ultrasonic sensors.


## Super-Resolution

![SuperResolution](../assets/img/research/super_resolution.png){:style="width: 100%;"}

Super-Resolution (SR) aims to reconstruct a high-resolution (HR) image/video from a low-resolution (LR) image/video. Despite its notorious difficulty, SR has received substantial attention due to its importance and practicality. Because the original high-frequency information is lost due to the down-sampling process, it is highly challenging to reconstruct the precise high-frequency details of the ground truth. For such high-frequency details, providing similar content explicitly is a more reasonable approach compared to generating fake textures. Hence, the importance of reference-based SR (RefSR) is rapidly arising to overcome the limitations of conventional SR. RefSR aims to recover high-resolution images by utilizing an external reference (Ref) containing similar content to generate rich textures, changing the one-to-many to an one-to-one mapping problem (_i.e._, mapping textures from the reference to the output).


## Semantic Segmentation & Domain Adaptation

![SemanticSegmentation](../assets/img/research/semantic_segmentation.png){:style="width: 100%;"}

Given the rapidly increasing demand for autonomous driving with high-level scene understanding capabilities, the importance of semantic segmentation is being reemphasized. For this reason, a variety of semantic segmentation networks have been developed with the help of large-scale labeled datasets. These networks have achieved superior performance on typical color images. However, they can easily be affected by external environmental changes. For example, the performance of a network trained with a well-conditioned dataset is easily degraded with cloudy, rainy, snowy, and nighttime images. Domain adaptation for semantic segmentation has explored this issue by transferring knowledge between various source and target domains (_e.g._, day-to-night adaptation).


## Knowledge Distillation & Image Matting

![KnowledgeDistillation](../assets/img/research/knowledge_distillation.png){:style="width: 100%;"}

Image matting is a task to predict the transparency (_i.e._, alpha matte) of a target foreground object with the help of a trimap. The trimap gives information on definite foreground, definite background, and unknown regions. Since unknown regions do not provide any clues on colors of foreground and background as well as alpha values, the image matting is considered as a highly ill-posed problem. Conventional methods require additional layers, making the networks more complex and heavy. As a result, the inference time gets longer, and its practicality becomes low. Therefore, lightening the networks is essential for practical applications such as portrait matting for a selfie. One of the widely used effective ways for network lightening is knowledge distillation. Its purpose is to train a small-capacity student network to mimic a large-capacity teacher network. In other words, the teacher network guides the student network to learn well.


## Automated Visual Inspection

![VisualInspection](../assets/img/research/visual_inspection.gif){:style="width: 100%;"}

Traditional inspections are typically conducted by humans with binoculars, infrared cameras, optical zoom cameras, or helicopters. However, these methodologies are costly, timeconsuming, labor-intensive, and potentially dangerous for operators. In order to overcome these problems, vision-based automatic inspection robots such as climbing robots and Unmanned Aerial Vehicles (UAVs) have been intensively investigated. These vision-based inspection robots improve efficiency and accuracy, reduce labor cost, and minimize human exposure to potential risks. We propose a vehicular multi-camera sensor system for automated visual inspection. By adjusting the tilt angles of lateral cameras on the fly, the proposed system automatically captures multi-view images of electric power distribution equipment such as electric poles, insulators, and transformers and detects those objects. To perform these tasks, we propose an object detection based geolocalization method and an algorithm to control our set of motorized cameras. The proposed geolocalization algorithm detects electric poles using the frontal stereo vision system, and then localizes detected objects in 3D GPS coordinates with the help of GPS/IMU information.
