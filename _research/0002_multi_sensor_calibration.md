---
title: Multi-Sensor Calibration
layout: post
slug: 0002-multi-sensor-calibration
---

<img src="/assets/img/research/multi_sensor_calibration.png" style="width:100%;" />

## Abstract

In this paper, we present MC-Calib, a novel and robust toolbox dedicated to the calibration of complex synchronized multi-camera systems using an arbitrary number of fiducial marker-based patterns. Calibration results are obtained via successive stages of refinement to reliably estimate both the poses of the calibration boards and cameras in the system. Our method is not constrained by the number of cameras, their overlapping field-of-view (FoV), or the number of calibration patterns used. Moreover, neither prior information about the camera system nor the positions of the checkerboards are required. As a result, minimal user interaction is needed to achieve an accurate and robust calibration which makes this toolbox accessible even with limited computer vision expertise. In this work, we put a strong emphasis on the versatility and the robustness of our technique. Specifically, the hierarchical nature of our strategy allows to reliably calibrate complex vision systems even under the presence of noisy measurements. Additionally, we propose a new strategy for best-suited image selection and initial parameters estimation dedicated to non-overlapping FoV cameras. Finally, our calibration toolbox is compatible with both, perspective and fisheye cameras. Our solution has been validated on a large number of real and synthetic sequences including monocular, stereo, multiple overlapping cameras, non-overlapping cameras, and converging camera systems.
