## Objective Video Quality Evaluation Methods and Metrics
视频质量评估（*VQA, Video quality assessment*）旨在设计一套自动评估视频质量的算法。这些自动评估算法可以与人类的主观评估在感知上保持一致。自动评估算法可以跟踪视频质量的指标。因为这些指标不需要人工现场试验，因此这些指标是可自动化的，并且可以重复执行来获得结果。然而，这些算法并非总是很完美，仅仅试图预测人类的主观体验而已。客观评估算法可能会因某些不可预测的内容而失败。因此，客观质量评价不能取代主观质量评价，客观质量评价只是作为质量评估的工具而已。ITU-T P.1401[^1]为各种媒体类型的客观质量评估提供了算法评估的框架。

在ITU-T P.1401中，客观质量评估的统计指标[^2]需要涵盖三个主要方面——准确性（*accuracy*），一致性（*consistency*）和线性相关性（*linearity*），这三个方面的指标计算需要和主观评估结果对应起来。其中，可以用预测误差来（*prediction error*）计算准确性，利用离群点率（*outlier ratio*）或者残差分布（*residual error distribution*）来计算一致性，利用皮尔森相关系数（*Pearson correlation coefficient*）来计算相关性。

算法预测结果残差[^3]的均方根误差（*RMSE, root mean square error*）可以用如下的公式计算。

$$
RMSE \ of \ \boldsymbol{P}_{error}=  \sqrt{\frac{1}{N-1} \sum_{i=1}^{N}\big(MOS(i)-MOS_{predicted}(i) \big)^2} \tag{式4-1}\label{式4-1}
$$

$$\ref{式4-1}$$中，$$N$$是样本的数量，$$N-1$$用于确保RMSE的无偏差估计。

残差（$$MOS-MOS_{predicted}$$）的分布通常符合二项分布的特征。低于某个预定义的阈值（通常该阈值需要满足具备95%的置信区间）的残差的概率的期望为$$\boldsymbol{P}_{th}=\frac{N_{th}}{N}$$，标准差为$$\sigma_{th}=\sqrt{\frac{P_{th}(1-P_{th})}{N}}$$，其中$$N_{th}$$表示残差低于指定阈值的样本数。

客观视频/图像质量指标在视频应用中扮演着各种不同的角色，特别是如下的角色：

* 用于质量的动态监控和调整。例如，网络数字视频服务器可以基于实时的视频质量评估来适当的地分配、控制和折衷视频流资源。
* 用于优化视频处理系统的算法和参数。例如，在视频编码器中，质量度量可以促进预滤波和码率控制算法的最佳设计。在视频解码器中，可以帮助优化重建算法、错误消除算法以及后期滤波（*post-filtering*）算法。
* 用于视频处理系统和算法的基准测试。
* 用于比较两个不同的视频系统解决方案。

### Classification of Objective Video Quality Metrics（客观视频质量指标的分类）
可以根据视频质量评估算法需要的参考信息的数量将客观视频质量评估方法分成三类：完全参考（*FR, full reference*），半参考（*RR, reduced reference*）和无参考（*NR, no reference*）。其中，FR方法可进一步划分为如下几类：

* 基于误差灵敏度的方法（*Error sensitivity based approaches*）
* 基于结构相似性的方法（*Structural similarity based approaches*）
* 基于信息保真度的方法（*Information fidelity based aproaches*）
* 时空方法（*Spatio-temporal approaches*）
* 基于显著性的方法（*Saliency based approaches*）
* 网络感知方法（*Network aware approaches*）

接下来的章节将会具体讨论如上的评估方法，并且在介绍的时候会增加对应的具体例子。

#### Full Reference（全参考）
#### Reduced Reference（半参考）
#### No Reference（无参考）

### Error Sensitivity Based Approaches（基于误差灵敏度的方法）
#### General Framework
#### Limitations

### Peak Signal-to-Noise Ratio
#### Applications
#### Advantages
#### Limitations
#### Improvements on PSNR
#### Moving Picture Quality Metric

### Structural Similarity Based Approaches（基于结构相似性的方法）
#### Structural Similarity Index

### Information Fidelity Based Approaches（基于信息保真度的方法）
#### Visual Information Fidelity

### Spatio-Temporal Approaches（时空方法）
#### Spatio-Temporal Video SSIM

### Saliency Based Approaches（基于显著性的方法）
#### Saliency-based Video Quality Assessment

### Network-Aware Approaches（网络感知方法）
#### Modified PSNR

### Noise-Based Quality Metrics
#### Noise Quality Measure

### Objective Coding Efficiency Metrics
#### BD-PSNR, BD-SSIM, BD-Bitrate
#### Advantages
#### Limitations
#### Generalized BD-PSNR
#### Limitations

### Examples of Standards-based Measures
#### Video Quality Metric
#### ITU-T G.1070 and G.1070E
#### ITU-T P.1202.2

[^1]: ITU-T P.1401, [Methods, Metrics and Procedures for Statistical Evaluation, Qualification and Composition of Objective Quality Prediction Models](https://www.itu.int/itu-t/recommendations/rec.aspx?rec=11688). 

[^2]: ITU-T P.1401, 7.5 Statistical evaluation metrics, P14.

[^3]: 残差：观测值与拟合值的偏离；误差：即观测值与真实值的偏离。
