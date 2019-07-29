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
* **误差归一化（*Error Normalization*）**：图像的不同分量可能在空间、时间位置，空间频率等方面非常接近，因此一个图像分量可能会减小或掩盖另一个分量的可见性。当计算并归一化每个信道中的误差信号时，需要考虑这种掩蔽效应（*masking effect*）。归一化过程通过空间变化的视觉门限（*visibility threshold*）[^13]对信道中的误差信号进行加权。对于每个通道，基于通道的基本灵敏度以及空间邻域中的参考或失真图像系数的能量确定视觉门限。归一化化过程仅利用差别感觉阈限（JND, just noticeable difference）[^14]表示错误。有的方法还会考虑对比度响应的饱和度的影响。
* **误差池（*Error Pooling*）**：模型的最后阶段会将归一化的误差信号组合成单个值。为了获得组合值，通常计算如$$\ref{式4-2}$$的明可夫斯基范数（*Minkowski norm*）。其中，$$e_{i,j}$$为第$$i$$个频率通道的第$$j$$个空间系数的归一化错误值，$$\beta$$为1~4的一个常量。
 
  $$
  E({e_{i,j}})=\bigg(\sum_{i}\sum_{j}|e_{i,j}|^{\beta}\bigg)^{\frac{1}{\beta}} \tag{式4-2}\label{式4-2}
  $$

#### Limitations
尽管基于误差灵敏度的方法通过模拟HVS的特性来估计误差信号的可见性，但是这些模型中的大多数都是基于受限刺激和简单刺激表征的线性或拟线性算子。实际上，HVS是一个复杂且高度非线性的系统。因此，基于错误敏感性的方法需要利用一些假设条件，因此也导致了以下的限制：

* **质量定义（*Quality definition*）**：基于误差敏感度的图像或视频质量评估方法仅跟踪图像保真度，较低的保真度并不总是意味着较低的视觉质量。 误差信号的可见性转换为质量下降的假设可能并不总是有效的。 有些扭曲是可见的，但并不那么令人反感。 通过全局增加亮度值来增亮整个图像就是一个这样的例子。 因此，图像保真度仅与图像质量有一定的相关性，而不是完全正比的相关性。
* **模型泛化（*Generalization of models*）**：许多误差敏感模型都是基于实验来估计误差门限，然而实验中刺激（*stimulus*）的误差几乎是不可见的。 这些阈值用于定义误差敏感度量，例如对比敏感度函数。 然而，在典型的图像或视频处理中，感知失真发生时，其误差值一般会远远高于实验给定的的阈值。因此，心理物理学（*suprathreshold psychophysics*）[^15]中的近阈值模型（*near-threshold models*）的泛化模型一般不是很精确。
* **信号特征（*Signal characteristics*）**：大多心理物理学（*psychophysical*）实验使用相对简单的图案，例如斑点，条形或正弦光栅。例如，经常利用全局正弦图像的阈值实验来获取CSF。然而，实践中的自然图像与简单图案的特征并不相同。因此，简化模型的适用性可能会在实践中受到限制。
* **依赖关系（*Dependencies*）**：错误池（*error pooling*）会因为其使用的假设（不同信道和空间位置的错误信号是独立的）而轻而易举的受到质疑。对于诸如小波变换的线性信道分解方法，自然图像的信道内和信道间小波系数之间存在强依赖关系。转换（*transformation*）和掩蔽模型（*masking models*）的优化设计会减少这种统计和感知的依赖性。但是，此类设计对VQA模型的影响尚未确定。
* **认知交互（*Cognitive interaction*）**：众所周知，诸如眼球运动之类的交互式视觉处理会影响感知质量。 此外，认知理解会对感知质量产生巨大影响。例如，对于不同的指令，用户可能会给同一图像打出不同的分数。对图像的先验知识和偏见也可能会影响图像质量的评估。因为认知交互难以理解、难以量化，大多数基于误差敏感度的评估方法都不会考虑认知交互的影响。

### Peak Signal-to-Noise Ratio（峰值信噪比）
峰值信噪比（*PSNR*）是信号的最大可能功率与失真噪声（失真噪声会影响到信号质量）功率之间的比率的表达式。信号经过压缩，处理或传输后经常会产生影响其表示质量的失真噪声。由于许多信号具有非常宽的动态范围（可变数量的最大和最小可能值之间的比率），因此PSNR通常用对数分贝（*logarithmic decibel(dB)*）单位来表示。由于HVS的非线性行为，PSNR并非总能完美的表示可感知的视觉质量，但是只要视频内容和编解码器类型没有改变，PSNR就是一种有效的质量测量[^16]。PSNR是有损环境中的视频信号保真度的良好指标。

对于原始信号$$f$$而言，经过一系列的处理和传输后，重建为近似信号$$\hat{f}$$。在这个过程中，会引入一些噪声。令$$f_m$$为信号的最大值或者峰值，对于用*n*-bit表示的信号而言，$$f_m=2^n - 1$$。对于*8*-bit的信号，其$$f_m=255$$，而*10*-bit的信号的$$f_m=1023$$。PSNR就是信号功率和噪声功率之间的比值，其数学定义如$$\ref{式4-3}$$所示。

$$
PSNR=10\ log_{10}\frac{(f_m)^2}{MSE} \tag{式4-3}\label{式4-3}
$$

$$\ref{式4-3}$$中的MSE用下式进行定义：

$$
MSE=\frac{1}{N}\sum_{i=1}^{N}{(f_i-\hat f_i)^2} \tag{式4-4}\label{式4-4}
$$

$$\ref{式4-4}$$中，$$N$$为样本的数量。

类似的，对于宽度为$$M$$，高度为$$N$$的图像或视频帧的二维信号而言，其MSE的定义如$$\ref{式4-5}$$。

$$
MSE=\frac{1}{M*N}\sum_{i=1}^M\sum_{j=1}^N\big(f(i,j)-\hat f(i,j)\big)^2 \tag{式4-5}\label{式4-5}
$$

其中，$$f(i,j)$$为原图像$$(i,j)$$处的像素值，$$\hat f(i,j)$$为重建图像中对应的像素值。

通常针对图像平面（*image plane*）测量PSNR，例如视频帧的亮度（*luma*）或色度（*chroma*）平面。

#### Applications
作为稳定的质量指标（*consistent quality metric*），PSNR一直应用于模拟视听系统。但是，在数字视频技术领域，PSNR会存在某些限制。然而，由于PSNR的低复杂性和易测量性，在评估有损视频压缩或处理算法时，PSNR仍然是最广泛使用的视频质量度量指标。PSNR还可用于评估压缩视频在特定比特率的情况下的质量增益。PSNR还可用于检测帧丢失或严重帧数据损坏的情况，并且可以在自动化环境中定位丢弃或损坏帧的位置。类似的检测在视频编码或处理方案的调试和优化中非常有用。此外，PSNR还广泛应用于比较两种视频编码方案。

#### Advantages
PSNR的优势如下：
* PSNR是一种简单、易用的，基于图片的度量指标。PSNR的计算非常快并且计算过程可以并行化（例如使用SIMD并行计算）。
* 由于PSNR基于MSE，因此它与差异信号的方向无关。无论源信号和重建信号的运算顺序如何，都会产生一致的PSNR输出。
* 实践中，PSNR可以很容易的融入自动化质量测量系统中。这种灵活性使PSNR适用于大型测试套件。因此，对于建立评估的信心而言，PSNR非常有用。
* PSNR计算是可重复执行的。对于相同的源和重建信号，其PSNR总是相同的。另外，PSNR也不依赖于视频的宽度或高度，PSNR适用于任何分辨率的视频。
* 与繁琐的主观测试不同，PSNR不需要对评估环境进行特殊设置。
* PSNR被认为是开发其它客观视频质量指标的参考基准。
* 对于相同的视频源和相同的编解码器，PSNR是一种稳定的质量指标（*consistent quality indictor*）。因此可利用PSNR优化编码器以最大化主观视频质量和编码器的性能。
* PSNR可单独用于亮度和色度信道。因此，PSNR可以非常方便地跟踪两个编码方案之间的亮度/颜色的变化。对于明确的质量要求，PSNR提供的单独信道的信息可用来确定哪个方案可以使用更少的比特位。
* PSNR的普及不仅源于它的简单性。作为度量标准，PSNR的性能也不容小觑。视频质量专家组（*VQEG, Video Quality Experts Group*）在2001年进行的验证研究发现：VQEG测试的九种VQA方法（包括当时的一些最复杂的算法）与PSNR方法“在统计上无法区分”[^17]。

#### Limitations
对PSNR的常见的意见如下：

* 一些研究表明，PSNR与主观质量评估之间的关联度不高[^18]。
* PSNR不考虑两个不同图像的可见性差异，而只考虑数值差异。PSNR不考虑视觉掩蔽现象[^19]或HVS的特征。对于PSNR而言，无论差异的可见性如何，两个图像中的所有像素都会用来计算PSNR。
* 在特定情况下，在预测主观视频质量方面，其它的客观感知质量指标的表现优于PSNR[^20]。
* PSNR不考虑编码器在执行时间（*execution time*）或机器周期（*machine cycles*）方面的计算复杂性。PSNR也不考虑系统配置，例如数据高速缓存大小，存储器访问带宽，存储复杂性，指令高速缓存大小，并行性和流水线。因此，当PSNR用作主要标准时，两个编码器的比较会受到很大的限制。
* 单独的PSNR没有提供关于编码器编码效率方面的足够信息。通常在表示视频文件所使用的位数（*bits*）方面也需要相应的测量成本。除非视频的文件大小或码率是已知的，否则说某个视频具有一定级别的PSNR是没有意义的。
* PSNR通常在整帧图像进行平均计算，而不考虑帧内的局部区域的统计信息。对于视频序列而言，质量在不同场景之间的变化可能很大。因此，如果基于帧的PSNR结果进行聚合并平均化PSNR，则可能无法精确地获取质量结果。
* PSNR不考虑帧延迟或帧丢失等时间维度的质量问题。另外，PSNR仅是源编码测量，而不考虑各种信道编码问题。因此，在有损网络环境中，PSNR不是一种合适的质量测量方法。
* PSNR是一种FR测量方法，因此在质量评估中需要提供参考视频。但是实践中，重建端通常并不能提供完美的参考视频。尽管如此，在评估、分析和评估视频质量方面，PSNR仍然有效且广受欢迎。

#### Improvements on PSNR
在很多文献中，已经进行了很多尝试来改善PSNR。给定失真的可见性取决于源图像的局部内容（*local content*）。图像变化不明显的平坦区域[^21]和图像边缘的噪声比快速变化区域（*busy area*）的噪声更令人反感。因此，与简单的用PSNR测量信号能量来评估信号的失真相比，有可能会有一种更复杂的方式可以模拟失真本身的视觉效果。例如，可以在频域中应用加权函数，从而对误差的低频分量赋予更多的权重。Sarnoff在2003年基于视觉辨别模式提出了差别感觉阈限（JND,  just noticeable difference）的方案[^22]。

#### Moving Picture Quality Metric
PSNR不考虑视觉掩蔽现象。即使错误不可察觉，每个像素的误差也会导致PSNR的降低。通常需要结合HVS模型来解决该问题。在文献中已经深入研究了HVS的两个关键方面：对比敏感度（*contrast sensitivity*）和掩蔽（*masking*）。第一种现象是，只有当对比度大于某个阈值时，眼睛才能检测到信号。眼睛的灵敏度会随空间频率、方向和时间频率的变化而变化。第二种现象与人类对多种信号组合的视觉反应有关。例如，考虑由前景和背景信号组成的刺激。此时，需要根据与背景的对比度来修改前景的检测阈值。

运动图像质量度量（*MPQM, moving picture quality metric*）[^23]是用于运动图像的、基于误差灵敏度的时-空（*spatio-temporal*）客观质量度量。MPQM包含了上述讨论的HVS的2个特性。按照 图4-12 所示的通用框架，MPQM首先将原始视频及其失真版本分解为感知信道。然后计算基于信道的失真度量，并且在计算过程中需要考虑对比度灵敏度和掩蔽。在获得每个通道的失真数据之后，组合所有通道的数据以计算质量等级。得到的质量等级范围为1~5（从差到优秀）。MPQM与某些视频的主观测试具有良好的相关性。但和其它的基于误差敏感度的方法一样，MPQM也会对其它视频产生不良结果[^24]。

原始MPQM算法不考虑色度信息，因此引入了一种MPQM的变体——颜色MPQM（CMPQM, color MPQM）算法。在CMPQM中，首先将颜色分量转换为与亮度成线性的RGB值。然后将RGB值转换为对应于亮度和两个色度通道的坐标值。然后通过滤波器组分析原始信号和失真信号的每个分量。由于HVS对色度不太敏感，因此这些信号仅需要9个空间滤波器和1个时间滤波器。CMPQM的其余步骤与MPQM中的步骤类似。

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

[^15]: [心理物理定律（Psychophysical Law）](https://baike.baidu.com/item/%E5%BF%83%E7%90%86%E7%89%A9%E7%90%86%E5%AE%9A%E5%BE%8B/3245341)是关于物理连续体上的变量和相应的感官反应之间的函数关系及其数量化的描述。这些定律的目的是解释感官系统的活动和预测感觉行为。心理物理定律描述的现象主要有两类，一是对刺激探察力或阈限的测量，二是对阈限刺激分辨能力的测量。

[^16]: Q. Huynh-Thu & M. Ghanbari: [Scope of validity of PSNR in image/video quality assessment](https://ieeexplore.ieee.org/document/4550695). 

[^17]: [Final report from the Video Quality Experts Group on the validation of objective models of video quality assessment](https://www.itu.int/md/T01-SG09-C-0060). 

[^18]: Bernd Girod: [What's wrong with mean-squared error?](https://www.semanticscholar.org/paper/What's-wrong-with-mean-squared-error-Girod/1c2b76c592cb8b487ff8df953ac02ecd1a01faad)

[^19]: [掩蔽效应（Masking Effects）](https://baike.baidu.com/item/掩蔽效应/2214658)，指由于出现多个同一类别（如声音、图像）的刺激，导致被试不能完整接受全部刺激的信息。

[^20]: ITU-T J.144: Objective Perceptual Video Quality Measurement Techniques for Digital Cable Television in the Presence of a Full Reference.

[^21]: 图像的平坦区域：[图像中属性变化不明显的区域成为图像的平坦区域](http://www.cnki.com.cn/Article/CJFDTotal-JSJX201711005.htm)。

[^22]: JEFFREY LUBIN, A visual discrimination mode for image system design and evaluation.

[^23]: Christian J. Van den Branden Lambrecht, Olivier Verscheure: Perceptual quality measure using a spatiotemporal model of the human visual system.

[^24]: http://www.irisa.fr/armor/lesmembres/Mohamed/Thesis.pdf.