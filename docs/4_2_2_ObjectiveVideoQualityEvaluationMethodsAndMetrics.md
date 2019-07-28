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
数字视频信号会经历很多处理步骤。在这些过程中，视频质量可能已被各种需求（压缩，速度或其他标准）所折中，从而使得用户可以获得可用的失真信号。在客观质量评估中，经常会测量失真信号的保真度。为了精确测量发生了多少退化，需要对参考信号（假定参考信号具有完美的质量）进行信号保真度测量。但是，参考信号也并不总是万能的。

全参考（*FR*）[^4]指标度量失真视频相对于参考视频的视觉质量劣化程度。FR要求参考视频没有质量损失并且以非压缩的形式提供，同时失真信号和参考信号需要具备精确的空间和时间对齐，并且具备相同的亮度和颜色标准。只有这样，才可以直接比较视频中的每一帧的每个像素。

一般以某种合理的方式计算参考信号和失真信号之间的距离来确定信号的保真度。FR质量评估方法试图利用HVS的重要生理、心理视觉特征进行建模，并使用该模型来评估信号保真度，进而实现客观质量预测和用户感官之间的一致性。随着保真度的增加，感知质量也会随之提高。FR在视频质量分析方面非常有效，并且广泛用于视频质量分析和基准测试。但FR要求质量评估期间对参考信号的可访问性，这种要求在实践中可能无法实现。这可能会限制FR的应用。

#### Reduced Reference（半参考）
当参考信号不能完全可用时，也可以设计模型和评估标准来客观评估视频质量。该领域的研究产生了各种使用部分参考信号的半参考（RR）[^5]方法。RR需要从参考/失真的测试视频中提取很多特征。提取的特征构成了比较两个视频的基础，因此RR不需要完整的参考信号。RR即避免了在没有任何参考信息的情况下所必须进行的假设操作，又保证了参考信息数量的可管理性。

#### No Reference（无参考）
无参考（NR）指标不依赖于显式参考视频，其仅分析失真的测试视频。因此，NR指标不受对齐问题的影响。然而，NR方法的主要挑战是区分当前信号是失真信号还是实际视频信号。因此，NR指标必须对视频内容和失真类型给出假设。

图4-11给出了FR和NR的流程图。

![](../images/4_11.png)

**图4-11.**基于参考的的分类举例：全参考和无参考算法流程图

王等人在论文中提出了一种NR测量算法[^6]。该算法将模糊效应和块效应视为JPEG压缩过程中产生的最重要的噪声，并建议提取可反映这些噪声相对大小的特征。该算法然后将提取的特征进行组合，从而生成质量预测模型，接下来使用主观实验结果对该模型进行训练。算法的提出者希望训练之后的模型也适用于其它图像的评估。虽然类似的算法可以不使用任何参考而仅根据可用的图像内容进行评估，但在有可用的参考信号时，最好还是使用FR方法进行评估。接下来的讨论将集中在各种 FR方法。

在所有条件下设计与感知视觉质量一致的客观度量算法是一个难题。许多可用的指标可能无法解释损坏图像的所有的失真类型，也无法解释图像的内容以及失真的强度。但这些指标提供了与人类主观感受相对一致的结果。因此，客观质量度量仍然是一个非常活跃的研究领域。接下来将介绍各种不同的FR质量评估算法。

### Error Sensitivity Based Approaches（基于误差灵敏度的方法）
当图像或视频帧经过有损处理时，就会产生失真的图像或视频帧。有损处理过程引入的误差量或失真量决定了视觉质量下降的程度。许多质量评估度量基于失真图像和参考图像之间的误差评估视频质量。在FR中，最简单、最广泛使用的度量指标是均方误差（*MSE, mean squared error*）。峰值信噪比（*PSNR, peak signal-to-noise ratio*）就是简单地通过均方误差（MSE）来定义。这些算法易于计算，具有明确的物理意义，并且在优化领域具备很好的数学便利性。但是，它们的结果与感知的视觉质量之间的匹配程度不高。

在基于误差灵敏度的图像或视频质量评估中，通常假设感知质量的损失与误差信号的可见性直接相关。MSE就是这个概念最简单的实现，MSE客观地量化了误差信号的强度。但是具有相同MSE的两个失真图像可能是不同类型的错误，并且，在这些错误中，其中一些错误比其它的错误更明显。在过去的四十年中，已经开发出了许多利用人类视觉系统（*HVS*）特征的质量评估方法。这些模型中的大多数都会修改MSE，以便根据误差信号的可见性对误差信号的不同方面进行加权。这些模型也基本上都基于一个通用框架。接下来将介绍该通用框架。

#### General Framework
图4-12描述了基于误差灵敏度的图像或视频质量评估方法的通用框架。对于大多数基于误差敏感度的质量评估模型而言，尽管具体细节可能有所不同，但是基本上都可以用类似的框图来描述。

![](../images/4_12.png)

**图4-12.**基于误差灵敏度的评估方法的通用框架

如图4-12，通用框架一般包括如下步骤：
* **预处理（*Pre-processing*）**：预处理会消除已知的失真并准备图像，以便在失真图像和参考图像之间进行公平的比较。例如，两个图像都经过适当的缩放和对齐。必要的情况下，还需要执行更适合于HVS的颜色空间转换或伽马校正。此外，可以用低通滤波器来模拟眼睛光学系统的点扩散函数（*PSF,  point spread function*）[^7]。另外，可以使用非线性点操作（*point operation*）[^8]修改图像来模拟人眼的光适应（*light adaptation*）[^9]现象。
* **信道分解（*Channel Decomposition*）**：通常将图像分解为对特定空间频率、时间频率以及方向敏感的子带[^10]或信道。复杂的方法试图在初级视觉皮层（*primary visual cortex*）[^11]中尽可能的模拟神经反应，而其他方法仅简单使用离散余弦变换（*DCT*）或小波变换(*wavelet transforms*)进行信道分解。
* **对比敏感度归一化（*Contrast Sensitivity Normalization*）**：对比敏感度函数（CSF）[^12]描述了HVS对视觉刺激中存在的不同空间和时间频率的灵敏度。通常用线性滤波器实现CSF的频率响应。很多早期的方法会在信道分解之前根据CSF对信号进行加权，但是最近的方法使用CSF作为每个信道的基本灵敏度归一化因子。
* **误差归一化（*Error Normalization*）**：图像的不同分量可能在空间、时间位置，空间频率等方面非常接近，因此一个图像分量可能会减小或掩盖另一个分量的可见性。当计算并归一化每个信道中的误差信号时，需要考虑这种掩码效应（*masking effect*）。归一化过程通过空间变化的视觉门限（*visibility threshold*）[^13]对信道中的误差信号进行加权。对于每个通道，基于通道的基本灵敏度以及空间邻域中的参考或失真图像系数的能量确定视觉门限。归一化化过程仅利用差别感觉阈限（JND, just noticeable difference）[^14]表示错误。有的方法还会考虑对比度响应的饱和度的影响。
* **误差池（*Error Pooling*）**：模型的最后阶段会将归一化的误差信号组合成单个值。为了获得组合值，通常计算如$$\ref{式4-2}$$的明可夫斯基范数（*Minkowski norm*）。其中，$$e_{i,j}$$为第$$i$$个频率通道的第$$j$$个空间系数的归一化错误值，$$\beta$$为1~4的一个常量。
 
  $$
  E({e_{i,j}})=\bigg(\sum_{i}\sum_{j}|e_{i,j}|^{\beta}\bigg)^{\frac{1}{\beta}} \tag{式4-2}\label{式4-2}
  $$

#### Limitations

### Peak Signal-to-Noise Ratio（峰值信噪比）
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

[^4]: ITU-T J.247: [Objective perceptual multimedia video quality measurement in the presence of a full reference](https://www.itu.int/rec/T-REC-J.247/en). 

[^5]: ITU-T J.246: [Perceptual visual quality measurement techniques for multimedia services over digital cable television networks in the presence of a reduced bandwidth reference](https://www.itu.int/rec/T-REC-J.246/en). 

[^6]: No-reference Perceptual Quality Assessment of JPEG Compressed Images.

[^7]: [点扩散函数（PSF, point spread function）](https://blog.csdn.net/qq254612999/article/details/50509793) 描述了一个成像系统对一个点光源（物体）的响应。PSF的一般术语就是系统响应，PSF是一个聚焦光学系统的冲击响应。在大多情况下，PSF可以认为像是一个能够表现未解析物体的图像中的一个扩展区块。函数上讲，PSF是成像系统传递函数的空间域表达。

[^8]: [点运算](https://baike.baidu.com/item/%E5%9B%BE%E5%83%8F%E8%BF%90%E7%AE%97/4857590)指的是对图像中的每个像素依次进行同样的灰度变换运算。

[^9]: 人刚从暗处走到亮处的时候，最初的一瞬间会感到强光耀眼发眩，眼睛睁不开，什么都看不清楚，要过几秒钟才能恢复正常，这就是[光适应现象。](https://baike.baidu.com/item/%E5%85%89%E9%80%82%E5%BA%94%E7%8E%B0%E8%B1%A1/22251703)

[^10]: [子带编码技术](https://baike.baidu.com/item/子带/5920794)，是将原始信号由时间域转变为频率域，然后将其分割为若干个子频带，并对其分别进行数字编码的技术。

[^11]: [初级视皮层（V1）](https://baike.baidu.com/item/初级视皮层/3168345)又被称为纹状皮层, 由6层细胞构成, 发达的第4层又被分为 A、B、C 三个亚层。位于Brodmann 17区，其输出信息有两条通道，分别为背侧流（Dorsal Stream）和腹侧流（Ventral Stream）。

[^12]: [对比敏感度函数(CSF, contrast sensitivity function)](http://dict.youdao.com/w/eng/%E5%AF%B9%E6%AF%94%E6%95%8F%E6%84%9F%E5%BA%A6%E5%87%BD%E6%95%B0/)是反映人眼辨认平均亮度下两个可见区域差别的能力指标。

[^13]: [视觉门限](https://baike.baidu.com/item/%E8%A7%86%E8%A7%89%E9%98%88%E9%99%90/4044716)：光刺激必须达到一定的数量才能引起感觉。能引起感觉的最低限度的光通量，称为视觉的绝对阈限。同时人眼的视觉阈限又与空间和时间因素有关。

[^14]: [差别感觉阈限](https://baike.baidu.com/item/差别感觉阈限/5817313)是指刚刚能引起差别感觉的刺激的最小差异量。也称为最小可觉差(just noticeable difference)，简称JND。