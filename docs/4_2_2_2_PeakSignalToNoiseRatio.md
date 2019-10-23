# 峰值信噪比，PSNR
峰值信噪比（*PSNR*）是信号的最大可能功率与失真噪声（失真噪声会影响到信号质量）功率之间的比率的表达式。信号经过压缩，处理或传输后经常会产生影响其表示质量的失真噪声。由于许多信号具有非常宽的动态范围（可变数量的最大和最小可能值之间的比率），因此PSNR通常用对数分贝（*logarithmic decibel(dB)*）单位来表示。由于HVS的非线性行为，PSNR并非总能完美的表示可感知的视觉质量，但是只要视频内容和编解码器类型没有改变，PSNR就是一种有效的质量测量[^16]。PSNR是有损环境中的视频信号保真度的良好指标。

对于原始信号$$f$$而言，经过一系列的处理和传输后，重建为近似信号$$\hat{f}$$。在这个过程中，会引入一些噪声。令$$f_m$$为信号的最大值或者峰值，对于用*n*-bit表示的信号而言，$$f_m=2^n - 1$$。对于*8*-bit的信号，其$$f_m=255$$，而*10*-bit的信号的$$f_m=1023$$。PSNR就是信号功率和噪声功率之间的比值，其数学定义如$${4-3}$$所示。

$$
(4-3) \ PSNR=10\ log_{10}\frac{(f_m)^2}{MSE}
$$

$${4-3}$$中的MSE用下式进行定义：

$$
(4-4) \ MSE=\frac{1}{N}\sum_{i=1}^{N}{(f_i-\hat f_i)^2} 
$$

$${4-4}$$中，$$N$$为样本的数量。

类似的，对于宽度为$$M$$，高度为$$N$$的图像或视频帧的二维信号而言，其MSE的定义如$${4-5}$$。

$$
(4-5) \ MSE=\frac{1}{M*N}\sum_{i=1}^M\sum_{j=1}^N\big(f(i,j)-\hat f(i,j)\big)^2
$$

其中，$$f(i,j)$$为原图像$$(i,j)$$处的像素值，$$\hat f(i,j)$$为重建图像中对应的像素值。

通常针对图像平面（*image plane*）测量PSNR，例如视频帧的亮度（*luma*）或色度（*chroma*）平面。

## 应用
作为稳定的质量指标（*consistent quality metric*），PSNR一直应用于模拟视听系统。但是，在数字视频技术领域，PSNR会存在某些限制。然而，由于PSNR的低复杂性和易测量性，在评估有损视频压缩或处理算法时，PSNR仍然是最广泛使用的视频质量度量指标。PSNR还可用于评估压缩视频在特定比特率的情况下的质量增益。PSNR还可用于检测帧丢失或严重帧数据损坏的情况，并且可以在自动化环境中定位丢弃或损坏帧的位置。类似的检测在视频编码或处理方案的调试和优化中非常有用。此外，PSNR还广泛应用于比较两种视频编码方案。

## 优势
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

## 限制
对PSNR的常见的意见如下：

* 一些研究表明，PSNR与主观质量评估之间的关联度不高[^18]。
* PSNR不考虑两个不同图像的可见性差异，而只考虑数值差异。PSNR不考虑视觉掩蔽现象[^19]或HVS的特征。对于PSNR而言，无论差异的可见性如何，两个图像中的所有像素都会用来计算PSNR。
* 在特定情况下，在预测主观视频质量方面，其它的客观感知质量指标的表现优于PSNR[^20]。
* PSNR不考虑编码器在执行时间（*execution time*）或机器周期（*machine cycles*）方面的计算复杂性。PSNR也不考虑系统配置，例如数据高速缓存大小，存储器访问带宽，存储复杂性，指令高速缓存大小，并行性和流水线。因此，当PSNR用作主要标准时，两个编码器的比较会受到很大的限制。
* 单独的PSNR没有提供关于编码器编码效率方面的足够信息。通常在表示视频文件所使用的位数（*bits*）方面也需要相应的测量成本。除非视频的文件大小或码率是已知的，否则说某个视频具有一定级别的PSNR是没有意义的。
* PSNR通常在整帧图像进行平均计算，而不考虑帧内的局部区域的统计信息。对于视频序列而言，质量在不同场景之间的变化可能很大。因此，如果基于帧的PSNR结果进行聚合并平均化PSNR，则可能无法精确地获取质量结果。
* PSNR不考虑帧延迟或帧丢失等时间维度的质量问题。另外，PSNR仅是源编码测量，而不考虑各种信道编码问题。因此，在有损网络环境中，PSNR不是一种合适的质量测量方法。
* PSNR是一种FR测量方法，因此在质量评估中需要提供参考视频。但是实践中，重建端通常并不能提供完美的参考视频。尽管如此，在评估、分析和评估视频质量方面，PSNR仍然有效且广受欢迎。

## PSNR的改进
在很多文献中，已经进行了很多尝试来改善PSNR。给定失真的可见性取决于源图像的局部内容（*local content*）。图像变化不明显的平坦区域[^21]和图像边缘的噪声比快速变化区域（*busy area*）的噪声更令人反感。因此，与简单的用PSNR测量信号能量来评估信号的失真相比，有可能会有一种更复杂的方式可以模拟失真本身的视觉效果。例如，可以在频域中应用加权函数，从而对误差的低频分量赋予更多的权重。Sarnoff在2003年基于视觉辨别模式提出了差别感觉阈限（JND,  just noticeable difference）的方案[^22]。

## 运动图像的质量指标
PSNR不考虑视觉掩蔽现象。即使错误不可察觉，每个像素的误差也会导致PSNR的降低。通常需要结合HVS模型来解决该问题。在文献中已经深入研究了HVS的两个关键方面：对比敏感度（*contrast sensitivity*）和掩蔽（*masking*）。第一种现象是，只有当对比度大于某个阈值时，眼睛才能检测到信号。眼睛的灵敏度会随空间频率、方向和时间频率的变化而变化。第二种现象与人类对多种信号组合的视觉反应有关。例如，考虑由前景和背景信号组成的刺激。此时，需要根据与背景的对比度来修改前景的检测阈值。

运动图像质量度量（*MPQM, moving picture quality metric*）[^23]是用于运动图像的、基于误差灵敏度的时-空（*spatio-temporal*）客观质量度量。MPQM包含了上述讨论的HVS的2个特性。按照 图4-12 所示的通用框架，MPQM首先将原始视频及其失真版本分解为感知信道。然后计算基于信道的失真度量，并且在计算过程中需要考虑对比度灵敏度和掩蔽。在获得每个通道的失真数据之后，组合所有通道的数据以计算质量等级。得到的质量等级范围为1~5（从差到优秀）。MPQM与某些视频的主观测试具有良好的相关性。但和其它的基于误差敏感度的方法一样，MPQM也会对其它视频产生不良结果[^24]。

原始MPQM算法不考虑色度信息，因此引入了一种MPQM的变体——颜色MPQM（CMPQM, color MPQM）算法。在CMPQM中，首先将颜色分量转换为与亮度成线性的RGB值。然后将RGB值转换为对应于亮度和两个色度通道的坐标值。然后通过滤波器组分析原始信号和失真信号的每个分量。由于HVS对色度不太敏感，因此这些信号仅需要9个空间滤波器和1个时间滤波器。CMPQM的其余步骤与MPQM中的步骤类似。

[^16]: Q. Huynh-Thu & M. Ghanbari: [Scope of validity of PSNR in image/video quality assessment](https://ieeexplore.ieee.org/document/4550695). 

[^17]: [Final report from the Video Quality Experts Group on the validation of objective models of video quality assessment](https://www.itu.int/md/T01-SG09-C-0060). 

[^18]: Bernd Girod: [What's wrong with mean-squared error?](https://www.semanticscholar.org/paper/What's-wrong-with-mean-squared-error-Girod/1c2b76c592cb8b487ff8df953ac02ecd1a01faad)

[^19]: [掩蔽效应（Masking Effects）](https://baike.baidu.com/item/掩蔽效应/2214658)，指由于出现多个同一类别（如声音、图像）的刺激，导致被试不能完整接受全部刺激的信息。

[^20]: ITU-T J.144: Objective Perceptual Video Quality Measurement Techniques for Digital Cable Television in the Presence of a Full Reference.

[^21]: 图像的平坦区域：[图像中属性变化不明显的区域成为图像的平坦区域](http://www.cnki.com.cn/Article/CJFDTotal-JSJX201711005.htm)。

[^22]: JEFFREY LUBIN, A visual discrimination mode for image system design and evaluation.

[^23]: Christian J. Van den Branden Lambrecht, Olivier Verscheure: Perceptual quality measure using a spatiotemporal model of the human visual system.

[^24]: http://www.irisa.fr/armor/lesmembres/Mohamed/Thesis.pdf.