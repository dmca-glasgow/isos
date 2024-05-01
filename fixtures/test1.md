Complex Analysis3U Complex Methods/3H Methods in Complex Analysis \html-tag\:br{\html-attr\:className{"linebreak"}} Lecture Notes

Christian Voigt

This course is mainly concerned with the differentiation and integration of complex functions (complex-valued functions defined on subsets of the complex plane). Differentiation is in many ways the same as for real functions, but there are some interesting differences. In particular, a complex function differentiable on an open disc or on the entire plane~$\mathbb{C}$ can always be differentiated infinitely often and be expressed as the sum of a Taylor series. Integration has a much richer theory than for real functions, because there are many paths in a plane from one point to another.

These lecture notes are based on material prepared by Richard Steiner and Christian Korff.

### PART I. DIFFERENTIATION

### Limits

Sequences of complex numbers and their limits are defined in basically the same way as for real numbers. By definition, a sequence of complex numbers is a function $\mathbb{N} \rightarrow \mathbb{C}$, usually written $(z_{n})_{n = 1}^{\infty}$ where $z_{n} \in \mathbb{C}$.

We say that $(z_{n})_{n = 1}^{\infty}$ converges to $z \in \mathbb{C}$ if for every $\epsilon > 0$ there exists $n_{0} \in \mathbb{N}$, such that for any $n \in \mathbb{N}$ with $n \geq n_{0}$, we have $|z_{n} - z| < \epsilon$. Equivalently,

$$
\forall\epsilon>0\;\exists n_{0} \in \mathbb{N} \text{ such that }n > n_{0} \Rightarrow |z_{n} - z| < \epsilon.
$$

In this case we shall write $\lim_{n\to\infty}z_{n} = z$.

A sequence $(z_{n})_{n = 1}^{\infty}$ of complex numbers converges to $z \in \mathbb{C}$ if and only if the real sequences $(\mathop{\textup{Re}}(z_{n}))_{n = 1}^{\infty}$ and $(\mathop{\textup{Im}}(z_{n}))_{n = 1}^{\infty}$ are convergent with limits $\mathop{\textup{Re}}(z)$ and $\mathop{\textup{Im}}(z)$, respectively.

A particulary important role in complex analysis are played by infinite series. By definition, a series of complex numbers is an expression of the form

$$
S = \sum_{n = 0}^{\infty} a_{n}
$$

for complex numbers $a_{0}, a_{1}, \dots$. The series $S$ is called convergent if the sequence $(S_{k})_{k = 0}^{\infty}$ of partial sums $S_{k} = \sum_{n = 0}^{k} a_{n}$ converges. In this case the limit $\lim_{n\to\infty}S_{n}$ is called the sum of the series. Many properties of real series, including criteria for checking convergence, carry over to the complex case.

Let $z \in \mathbb{C}$ be such that $|z| < 1$. Then the geometric series

$$
\sum_{n = 0}^{\infty} z^{n}
$$

converges, and its sum is $\frac{1}{1 - z}$.

We shall also be interested in limits of functions.

Let $U$ be a subset of~$\mathbb{C}$, let $f$ be a function from~$U$ to~$\mathbb{C}$, and let $a,w \in \mathbb{C}$. We say that $f(z)$ converges to $w$ as $z$ tends to $a$ if\
(1) there exists $R > 0$ such that

$$
0 < |z - a| < R \Rightarrow z \in U;
$$

\
(2) for all $\epsilon > 0$ there exists $\delta > 0$ such that if $z \in U$ then

$$
0 < |z - a| < \delta \Rightarrow \left|f(z) - w\right| < \epsilon.
$$

\
In this case we write $\lim_{z \to a}f(z) = w$.

Note that $a$ need not be contained in $U$. Limits of functions can be described in terms of sequences, in analogy to the real case.

Let $U$ be a subset of~$\mathbb{C}$, let $f$ be a function from~$U$ to~$\mathbb{C}$, and let $a \in \mathbb{C}$. Assume that there exists $R > 0$ such that $0 < |z - a| < R \Rightarrow z \in U$.\
Then $f(z)$ converges to $w$ as $z$ tends to $a$ if and only if for every sequence $(z_{n})_{n = 1}^{\infty}$ in $U$ with $\lim_{n \to \infty}z_{n} = a$ and $z_{n} \neq a$ for all $n$ we have $\lim_{n \to \infty}f(z_{n}) = w$.

### Introduction to differentiation

CMS1

Differentiation of complex functions is defined in essentially the same way as over the real numbers.

CMD1.1 Let $U$ be a subset of~$\mathbb{C}$, let $f: U \rightarrow \mathbb{C}$ be a function, and let $a$ be a point of~$U$. One says that $f$~is _differentiable_ at~$a$, with _derivative_~$l$, if

1. there exists $r > 0$ such that

   $$
   |z - a| < r \Rightarrow z \in U;
   $$

2. for all $\epsilon > 0$ there exists $\delta > 0$ such that if $z \in U$ then

   $$
   0 < |z - a| < \delta \Rightarrow \left|\dfrac{f(z) - f(a)}{z - a}- l\right| < \epsilon.
   $$

In other words, $f$~is differentiable at~$a$, with derivative~$l$, if $f$~is defined at all points sufficiently close to~$a$ and if the difference quotient

$$
\dfrac{f(z) - f(a)}{z - a}
$$

converges to~$l$ when $z$~tends to~$a$. As usual, if the derivative of~$f$ at~$a$ exists, then it is denoted $f'(a)$. If $f: U \rightarrow \mathbb{C}$ is differentiable at all points of $U$ we also write

$$
\dfrac{d}{dz}f(z) \quad (\text{or }\dfrac{d}{dz}f = \dfrac{df}{dz})
$$

for the derivative, viewed as a function on $U$ with values in $\mathbb{C}$.

Many results regarding differentiability for complex functions are the same as for real functions. For instance, if $c$~is a constant then it is easy to see that

$$
\dfrac{dc}{dz}= 0.
$$

The following rules are verified in the same way as in real analysis.

If $f: U \rightarrow \mathbb{C}$~and~$g: U \rightarrow \mathbb{C}$ are differentiable functions then

- (Additivity) $\dfrac{d}{dz}(f\pm g)=\dfrac{df}{dz}\pm\dfrac{dg}{dz},$

- (Product Rule) $\dfrac{d}{dz}(fg)=g\dfrac{df}{dz}+f\dfrac{dg}{dz},$

- (Quotient Rule) $\dfrac{d}{dz}\dfrac{f}{g}=\dfrac{g\dfrac{df}{dz}-f\dfrac{dg}{dz}}{g^2}$ provided $g$ is nowhere zero.

By using these results, one can differentiate polynomials and rational functions, just as one would expect.

If $n$~is a natural number, then

$$
\dfrac{d}{dz}z^{n} = nz^{n-1}.
$$

This follows inductively by writing $z^{n} = z^{n - 1}z$ and using the product rule.

The chain rule holds as well. That is, if $g$~is differentiable at~$a$ and $f$~is differentiable at $g(a)$, then $f\circ g$ is differentiable at~$a$ and

$$
(f \circ g)'(a) = f'\bigl(g(a)\bigr)g'(a).
$$

CME1.3 Show that the function~$f(z) = \bar{z}$ is not differentiable anywhere on $\mathbb{C}$.Let $a \in \mathbb{C}$ be arbitrary. Let $z \in \mathbb{C}$ be a nearby point with $|z - a| = r > 0$. Then $z = a + re^{i\theta}$ for some~$\theta$, and the difference quotient is

$$
\dfrac{\bar{z} - \bar{a}}{z - a}= \dfrac{\bar{a} + re^{-i\theta}-\bar{a}}{a + re^{i\theta} - a}= \dfrac{e^{-i\theta}}{e^{i\theta}}= e^{-2i\theta}.
$$

The difference quotient takes arbitrary values with modulus~$1$ for arbitrarily small values of $|z - a|$, so it does not tend to a limit as $z$~tends to~$a$. Therefore the function $z \mapsto \bar{z}$~is not differentiable at~$a$.CME1.4 At which points is the function~$|z|^{2}$ differentiable?Let $a \in \mathbb{C}$ be any point and let $z = a + re^{i\theta}$ be a nearby point. Then the difference quotient is

$$
\dfrac{z\bar z - a\bar a}{z-a}&= \dfrac{(a + re^{i\theta})(\bar{a} + re^{-i\theta}) - a\bar{a}}{re^{i\theta}}\\&= \dfrac{are^{-i\theta} + \bar{a} re^{i\theta} + r^2}{re^{i\theta}}\\&= ae^{-2i\theta}+ \bar{a}+ re^{-i\theta}.
$$

In this expression $\bar{a}+ re^{-i\theta}$ tends to~$\bar{a}$ as $r$~tends to~$0$. If $a \neq 0$, then $ae^{-2i\theta}$ takes arbitrary values of modulus~$|a|$ with $z$~arbitrarily close to~$a$, so the difference quotient does not tend to a limit. But if $a = 0$, then the difference quotient tends to~$0$. Therefore $|z|^{2}$~is differentiable only at $z = 0$.

This is a curiosity; we are really interested in functions which are differentiable on large regions, not just at isolated points.

CMD1.5 Let $c$ be a point in~$\mathbb{C}$ and let $r$ be a positive real number. Then the _open disc_ with centre~$c$ and radius~$r$ is the set

$$
\{z \in \mathbb{C} \mid |z - c| < r \}.
$$

CMD1.6 A subset~$U$ of~$\mathbb{C}$ is _open_ if for every point~$a \in U$ there is an open disc with centre~$a$ entirely contained in~$U$.CME1.7 Every open disc is open, and $\mathbb{C}$~is open.CMD1.8 A _holomorphic function_ is a function $f \colon U \to \mathbb{C}$ such that $U$~is an open subset of~$\mathbb{C}$ and $f$~is differentiable at every point of~$U$.

This course is about holomorphic functions. Note that, for a complex function defined on an open set~$U$, the first condition for differentiability in Definition~CMD1.1 is automatically satisfied at every point of~$U$.

### Power series

CMS2

Complex series and power series behave just like real ones. By a complex power series we mean a series of the form

$$
\sum_{n = 0}^{\infty} a_{n}(z-c)^{n} = a_{0} + a_{1}(z-c) + a_{2}(z-c)^{2} + \cdots,
$$

where $c$~and $a_{0}, a_{1}, \dots$ are complex numbers. Let us list some important facts about such power series.

power Let $\sum_{n = 0}^{\infty} a_{n}(z - c)^{n}$ be a complex power series.

1. There is a radius of convergence~$R$ with $0 \leq R \leq \infty$ such that the series converges for $|z - c| < R$ and diverges for $|z - c| > R$.

2. Suppose that $R > 0$ and let $D$ be the open disc with centre~$c$ and radius~$R$, with the convention that $D = \mathbb{C}$ if $R = \infty$. Let $f(z)$ be the sum of the series. Then $f$~is holomorphic on~$D$. The derivative is given by

   $$
   f'(z) = \sum_{n = 1}^{\infty} na_{n}(z-c)^{n-1}= a_{1} + 2a_{2}(z-c) + 3a_{3}(z-c)^{2} + \cdots,
   $$

   and also has radius of convergence~$R$.

In many cases the radius of convergence can be found from the ratio test.

CMT2.2 If a power series

$$
\sum_{n=0}^{\infty} a_{n}(z - c)^{n} = a_{0} + a_{1}(z - c) + a_{2}(z - c)^{2} + \cdots
$$

is such that $|a_{n + 1}/a_{n}|$ converges to a finite or infinite limit~ $0 \leq L \leq \infty$ as $n \to \infty$, then the radius of convergence is $1/L$.

Here we use the convention $1/0 = \infty$ and $1/\infty = 0$.

Assume now that $f(z) = \sum_{n = 0}^{\infty} a_{n}(z - c)^{n}$ is a complex power series with radius of convergence $R$, and let $D$ be the open disc of radius $R$ centred at $c$. By applying Theorem power repeatedly, one sees that the function $f$~can be differentiated infinitely often on $D$ and that

$$
f^{(n)}(c) = n! a_{n}.
$$

The original series is then equal to the Taylor series

$$
f(z) = \sum_{n = 0}^{\infty} \dfrac{f^{(n)}(c)}{n!}(z - c)^{n} = f(c) + f'(c)(z - c) + \dfrac{f''(c)}{2!}(z - c)^{2} + \dfrac{f'''(c)}{3!}(z - c)^{3} + \cdots.
$$

There are also functions~$F$ on~$D$ such that $F'(z) = f(z)$, in other words, we can always find an _antiderivative_ of~$f$. These functions are given by the series

$$
F(z) = k + \sum_{n=0}^{\infty}\dfrac{a_n}{n+1}(z-c)^{n+1},
$$

where $k$~is an arbitrary constant, and one can show that these series also have radius of convergence~$R$.

CME2.1 From the theory of geometric series, there is a power series $S(z)$ in~$z$ with radius of convergence~$1$ given by

$$
S(z) = \sum_{n=0}^{\infty} z^{n} = 1 + z + z^{2} + \cdots
$$

such that $S(z) = 1/(1 - z)$. By differentiating and integrating term by term, we obtain power series $D(z)$ and $I(z)$ with radius of convergence~$1$ such that

$$
D(z)&= 1 + 2z + 3z^{2} + \cdots, \\ I(z)&= z + \tfrac{1}{2}z^{2} + \tfrac{1}{3}z^{3} + \cdots
$$

and such that

$$
D(z)&= \dfrac{d}{dz}\dfrac{1}{1 - z}= - \dfrac{1}{(1 - z)^2}\dfrac{d}{dz}(1 - z) = \dfrac{1}{(1 - z)^2}, \\ I'(z)&= \dfrac{1}{1 - z}.
$$

By modifying this example, if $c$~is any non-zero complex number, then $1/z$ has an antiderivative on the open disc with centre~$c$ and radius~$|c|$.

### Elementary functions

CMS3

The _exponential function_ $\exp(z) = e^{z}$ can be defined for all complex numbers~$z$ as the sum of the power series

$$
\exp(z) = e^{z} = 1 + z + \dfrac{z^2}{2!}+ \dfrac{z^3}{3!}+ \cdots = \sum_{n = 0}^{\infty} \dfrac{z^n}{n!},
$$

the radius of convergence being infinite by the ratio test. One can then define $\cos(z)$ and $\sin(z)$ for all complex numbers~$z$ by

$$
\cos(z) = \dfrac{e^{iz} + e^{-iz}}{2}= 1 - \dfrac{z^2}{2!}+ \dfrac{z^4}{4!}- \cdots = \sum_{n = 0}^{\infty} (-1)^{n} \frac{z^{2n}}{(2n)!}
$$

and

$$
\sin(z) = \dfrac{e^{iz} - e^{-iz}}{2i}= z - \dfrac{z^3}{3!}+ \dfrac{z^5}{5!}- \cdots = \sum_{n = 0}^{\infty} (-1)^{n} \frac{z^{2n + 1}}{(2n + 1)!},
$$

the radii of convergence again being infinite. These definitions agree with the usual definitions when $z$~is real, and as in the real case one has

$$
\dfrac{d}{dz}e^{z}=e^{z},\quad \dfrac{d}{dz}\cos(z)=-\sin(z),\quad \dfrac{d}{dz}\sin(z)=\cos(z).
$$

We note also that _Euler's identity_

$$
e^{iz}= \dfrac{e^{iz}+e^{-iz}}{2}+\dfrac{e^{iz}-e^{-iz}}{2}= \cos(z) + i\sin(z)
$$

holds for all complex numbers~$z$.

CME3a For any fixed $w \in \mathbb{C}$ the function $z \mapsto e^{z + w}e^{-z}$ is constant.For~$w \in \mathbb{C}$ one has

$$
\dfrac{d}{dz}(e^{z+w}e^{-z}) = e^{z+w}e^{-z}+ e^{z+w}(-e^{-z}) = 0,
$$

using the product rule and the above formula for the derivative of $\exp$. It follows that

$$
e^{z+w}e^{-z}= e^{0+w}e^{-0}= e^{w}
$$

for all $z,w \in \mathbb{C}$, which yields the claim.

In particular, Lemma CME3a shows $e^{z} e^{-z}= e^{0} = 1$, so $e^{z}$~is non-zero for all $z \in \mathbb{C}$, and

$$
e^{-z}= \dfrac{1}{e^z}.
$$

For all complex numbers $z$~and~$w$ it now follows from the formula $e^{z + w}e^{-z}= e^{w}$ that

$$
&e^{z+w}= e^{z} e^{w},\\&e^{z-w}= \dfrac{e^z}{e^w}.
$$

In particular for $z = x + iy$ with $x,y \in \mathbb{R}$ we have

$$
e^{z} = e^{x + iy}= e^{x} e^{iy}= e^{x}(\cos(y) + i\sin(y)),
$$

so that the complex exponential function can be expressed in terms of the real exponential and trigonometric functions. The complex sine and cosine functions can then also be expressed in terms of the real exponential and trigonometric functions, as can the other trigonometric functions like

$$
\tan(z) = \dfrac{\sin(z)}{\cos(z)}.
$$

Moreover we can easily recover various known properties of trigonometric functions.

CME3.0 Show that $\cos^{2}(z) + \sin^{2}(z) = 1$ for all $z \in \mathbb{C}$.We calculate

$$
\cos^{2}(z) + \sin^{2}(z)&= (\cos(z) + i\sin(z))(\cos(z) - i\sin(z)) \\&= \bigg(\frac{e^{iz}+ e^{-iz}}{2}+ \frac{e^{iz}- e^{-iz}}{2}\bigg) \bigg(\frac{e^{iz}+ e^{-iz}}{2}- \frac{e^{iz}- e^{-iz}}{2}\bigg) \\&= e^{iz}e^{-iz}= 1,
$$

directly from the definition of $\sin$ and $\cos$.

We also have the hyperbolic sine and cosine functions defined by

$$
\cosh(z) = \tfrac{1}{2}(e^{z} + e^{-z}), \quad \sinh(z) = \tfrac{1}{2}(e^{z} - e^{-z}),
$$

and other hyperbolic functions like $\tanh$. These hyperbolic functions are just slight variants of the usual trigonometric functions, in the sense that

$$
\cosh(z) = \cos(iz), \quad \sinh(z) = -i\sin(iz), \quad \tanh(z) = -i \tan(iz)
$$

for all $z \in \mathbb{C}$.

CME3.0.5 Show that $\cosh^{2}(z) - \sinh^{2}(z) = 1$ for all $z \in \mathbb{C}$.This is similar to Example CME3.0. We calculate

$$
\cosh^{2}(z) - \sinh^{2}(z) = (\cosh(z) + \sinh(z))(\cosh(z) - \sinh(z)) = e^{z} e^{-z}= 1,
$$

directly from the definition of the hyperbolic sine and cosine functions.

From Example CME3.0.5 it follows in particular that the points $(\cosh(t), \sinh(t)) \in \mathbb{R}^{2}$ for $t \in \mathbb{R}$ form the unit hyperbola

$$
H = \{(x,y) \in \mathbb{R}^{2} \mid x^{2} - y^{2} = 1 \text{ and }x > 0 \}.
$$

This is the reason why these functions are called hyperbolic. By comparison, note that the set of all $(\cos(t), \sin(t))$ for $t \in \mathbb{R}$ is the unit circle, which is why the functions $\sin$ and $\cos$ are called trigonometric.

Let us next discuss _logarithms_. For a given complex number~$z$ we consider the equation

$$
e^{w} = z.
$$

The solutions~$w \in \mathbb{C}$ of this equation are called the complex logarithms of~$z$. If $z = 0$ then there are no solutions, since we have seen above that $e^{w}$ is nonzero for every $w \in \mathbb{C}$. For $z \neq 0$ let

$$
z = r e^{i\theta}\quad (r,\theta \in \mathbb{R},\ r>0)
$$

be a polar form of~$z$, and let

$$
w = u + iv\quad (u,v \in \mathbb{R})
$$

be the cartesian form of~$w$; then

$$
e^{w} = z&\iff e^{u} e^{iv}= re^{i\theta}\\&\iff u = \log(r),\ v = \theta + 2k\pi\quad (k\in\mathbb{Z}).
$$

We write this in the form

$$
\log(z) = \log|z| + i\arg(z).
$$

Here$\log |z|$ is the ordinary real natural logarithm of the positive real number~$|z|$, and $\arg(z)$ is the argument of~$z$.

Note that $\arg(z)$ has infinitely many values: if $\theta$~is one value then the complete set of values is given by $\theta + 2k\pi$ where $k$~is any integer. Correspondingly, $\log(z)$ has infinitely many values. The notation $\log(z)$ should therefore be used with great care.

CME3.1 Find the complex logarithms of~$z$ for $z = -1 + i\sqrt{3}$.We have

$$
\log(z) = \log |z| + i\arg(z).
$$

For $z = x + iy$ with $x,y \in \mathbb{R}$ we have $|z| = \sqrt{x^{2} + y^{2}}$ and

$$
\arg(z) = \begin{cases}\tan^{-1}(y/x)+2k\pi&(x>0),\\ \tan^{-1}(y/x)+(2k+1)\pi&(x<0),\end{cases}
$$

where $k$~is an arbitrary integer. In this case $|z| = 2$ and

$$
\arg(z) = -\tfrac{1}{3}\pi + (2k+1)\pi,
$$

so

$$
\log(z) = \log(2) - \tfrac{1}{3}\pi i + (2k + 1)\pi i,
$$

where $k$~is an arbitrary integer.

If we restrict attention to some fixed branch of the argument, like $-\pi < \theta < \pi$ we can turn $\log$ into a (well-defined) holomorphic function. The equation

$$
z = e^{\log(z)}
$$

can then be differentiatedto give

$$
1 = e^{\log z}\dfrac{d}{dz}\log(z) = z \dfrac{d}{dz}\log(z),
$$

hence

$$
\dfrac{d}{dz}\log(z) = \dfrac{1}{z}
$$

for all $z \neq 0$. In this way we get antiderivatives for the function $1/z$, at least locally.

We use logarithms to define generalised powers~$z^{w}$ for $z,w \in \mathbb{C}$ with $z \neq 0$ by the formula

$$
z^{w} = e^{\log(z) w}.
$$

These are again multivalued, so should be treated very cautiously. However, they do give holomorphic functions on small regions if one makes a continuous choice for the logarithm. In general, one gets an infinite sequence of possible values for $z^{w}$, but if $w$~is a rational number $m/n$ such that $m$~and~$n$ are coprime integers and $n > 0$, then one gets precisely $n$~distinct values. In particular, if $m$~is an integer then $z^{m}$~has a single value. These single values are as one would expect:

$$
\dots,\ z^{-2}= 1/(zz),\ z^{-1}= 1/z,\ z^{0} = 1,\ z^{1} = z,\ z^{2} = zz, \dots.
$$

CME3.2 Calculate all values for $(2i)^{1/2}$.We have $(2i)^{1/2}= e^{\tfrac{1}{2}\log(2i)}$, and $\log(2i) = \log(2) + \frac{\pi}{2}i + 2k\pi i$ for $k$ any integer. Therefore we obtain

$$
(2i)^{1/2}= e^{\log(2)/2 + \pi/4 i + k \pi i}= \pm \sqrt{2}e^{\pi/4 i}= \pm (1 + i)
$$

as solutions.

Using the above methods we can also solve equations involving functions which are built out of the exponential function, like trigonometric functions.

CME3.2 Find the complex numbers~$z$ such that $\cos(z) = 10$.We treat the equation

$$
\tfrac{1}{2}(e^{iz}+ e^{-iz}) = 10
$$

as a quadratic equation in~$e^{iz}$. After rearrangement it becomes

$$
(e^{iz})^{2}-20 e^{iz}+ 1 = 0.
$$

The solutions are

$$
e^{iz}= \dfrac{20\pm\sqrt{396}}{2}= 10\pm\sqrt{99},
$$

so that

$$
iz = \log(10\pm\sqrt{99}) + 2k\pi i,
$$

that is,

$$
z = -i\log(10\pm\sqrt{99}) + 2k\pi,
$$

where $k$~is an arbitrary integer.

### The Cauchy--Riemann equations

CMS4

By taking real and imaginary parts, a complex-valued function of a complex variable can be regarded as a complex-valued function of two real variables or as a pair of real-valued functions of two real variables. It turns out that the differentiability of the complex-valued function is essentially equivalent to two simultaneous equations between the partial derivatives of the real-valued functions.

CMT4.1 Let $w$ be a complex-valued function of a complex variable~$z$ and let

$$
u = \mathop{\textup{Re}}(w),\ v = \mathop{\textup{Im}}(w),\ x = \mathop{\textup{Re}}(z),\ y = \mathop{\textup{Im}}(z),
$$

so that

$$
w(z) = w(x + iy) = u(x,y) + i v(x,y).
$$

If $w$~is differentiable with respect to~$z$, then the real-valued functions $u$~and~$v$ have (continuous) partial derivatives with respect to $x$~and~$y$ and

$$
&\dfrac{dw}{dz}= \dfrac{\partial w}{\partial x}= \dfrac{\partial u}{\partial x}+ i\dfrac{\partial v}{\partial x}, \\&\dfrac{\partial u}{\partial x}= \dfrac{\partial v}{\partial y}, \\&\dfrac{\partial u}{\partial y}= -\dfrac{\partial v}{\partial x}.
$$

Conversely, if $u$~and~$v$ are real-valued functions having continuous partial derivatives with respect to $x$~and~$y$ such that the _Cauchy--Riemann equations_

$$
\dfrac{\partial u}{\partial x}= \dfrac{\partial v}{\partial y}, \quad \dfrac{\partial u}{\partial y}= -\dfrac{\partial v}{\partial x}
$$

hold, then $w$~is differentiable with respect to~$z$.Suppose first that $w$~is differentiable with respect to~$z$. Then for any given value of~$z$ we have

$$
\dfrac{dw}{dz}&= \lim_{h \to 0}\dfrac{w(z + h) - w(z)}{h}\\&= \lim_{h \to 0}\dfrac{u(z + h) - u(z)}{h}+ i\lim_{h \to 0}\dfrac{v(z + h) - v(z)}{h}.
$$

Restricting~$h$ to real values shows that

$$
\dfrac{dw}{dz}= \dfrac{\partial w}{\partial x}= \dfrac{\partial u}{\partial x}+ i\dfrac{\partial v}{\partial x}.
$$

Restricting~$h$ to purely imaginary values shows that

$$
\dfrac{dw}{dz}= \dfrac{1}{i}\dfrac{\partial w}{\partial y}= \dfrac{1}{i}\dfrac{\partial u}{\partial y}+ \dfrac{\partial v}{\partial y}= -i\dfrac{\partial u}{\partial y}+ \dfrac{\partial v}{\partial y}.
$$

Equating real and imaginary parts in the two expressions for $dw/dz$ therefore gives

$$
\dfrac{\partial u}{\partial x}= \dfrac{\partial v}{\partial y}, \quad \dfrac{\partial u}{\partial y}=-\dfrac{\partial v}{\partial x}
$$

as required.\
Conversely, suppose that $u$~and~$v$ have continuous partial derivatives satisfying the Cauchy--Riemann equations. There are then continuous real-valued functions $s$~and~$t$ of~$z$ such that

$$
s = \dfrac{\partial u}{\partial x}= \dfrac{\partial v}{\partial y},\quad t = \dfrac{\partial u}{\partial y}= -\dfrac{\partial v}{\partial x}.
$$

For any given value of~$z$ we will show that

$$
\dfrac{w(z + h) - w(z) - h[s(z) - it(z)]}{h}\to 0
$$

as $h \to 0$; this will show that $w$~is differentiable as a function of~$z$, with derivative $s - it$.\
Let $h = k + il$ with $k,l \in \mathbb{R}$. Take $w(z + h) - w(z)$ in the form

$$
[w(z + k + il) - w(z + il)] + [w(z + il) - w(z)]
$$

and expand this to obtain

$$
[u(z + k + il) - u(z + il)] + i[v(z + k+ il) - v(z + il)] + [u(z + il) - u(z)] + i[v(z +il) - v(z)].
$$

By the mean value theorem from real analysis we find $z_{1},z_{2},z_{3},z_{4}$ such that

$$
w(z + h) - w(z) = ks(z_{1}) - ikt(z_{2}) + lt(z_{3}) + ils(z_{4})
$$

where $z_{1}$~and~$z_{2}$ are between $z + k + il$ and $z + il$, and $z_{3}$~and~$z_{4}$ are between $z + il$ and~$z$. Note here that if $k = 0$ we may take $z_{1} = z_{2} = z + il$, and similarly $z_{3} = z_{4} = z$ if $l = 0$. The points $z_{1},z_{2},z_{3},z_{4}$ depend on~$h$, and they tend to~$z$ as $h \to 0$. On the other hand we have

$$
h[s(z) - it(z)] = (k + il)[s(z) - it(z)] = ks(z) - ikt(z) + lt(z) + ils(z).
$$

Therefore

$$
&\dfrac{w(z + h) - w(z) - h[s(z) - it(z)]}{h}\\&= \dfrac{k}{h}[s(z_{1}) - s(z)] -\dfrac{ik}{h}[t(z_{2}) - t(z)] +\dfrac{l}{h}[t(z_{3}) - t(z)] +\dfrac{il}{h}[s(z_{4}) - s(z)].
$$

Here $|k/h| \leq 1$ because $k = \mathop{\textup{Re}}(h)$. Moreover we have $s(z_{1}) - s(z) \to 0$ as $h \to 0$ because $s$~is continuous, and similarly for the other terms in this expression. It follows that

$$
\dfrac{w(z + h) - w(z) - h[s(z) - it(z)]}{h}\to 0
$$

as $h \to 0$, as required.\
This completes the proof.CME4.2 Let

$$
u = e^{x}\cos(y),\ v = e^{x}\sin(y).
$$

Then $u$~and~$v$ have continuous partial derivatives with respect to $x$~and~$y$, and

$$
&\dfrac{\partial u}{\partial x}= e^{x}\cos(y) = \dfrac{\partial v}{\partial y}, \\&\dfrac{\partial u}{\partial y}= -e^{x}\sin(y) = -\dfrac{\partial v}{\partial x}, \\
$$

so there is a holomorphic function given by

$$
f(x + iy) = e^{x}(\cos(y) + i\sin(y)) \quad (x,y\in\mathbb{R})
$$

with

$$
f'(x + iy) = \dfrac{\partial}{\partial x}f(x + iy) = f(x + iy).
$$

This gives an alternative approach to the complex exponential function.CME4.3 Let $u = x$ and $v = -y$; then $\partial u/\partial x = 1 \neq -1 = \partial v/\partial y$, so the function

$$
x + iy \mapsto x - iy \quad (x,y\in\mathbb{R})
$$

is not differentiable. This gives an alternative proof that the complex conjugate function is not holomorphic.

### Harmonic functions

CMS5

A _harmonic function_ is a real-valued function~$u$ of two real variables $x$~and~$y$ which satisfies the _Laplace equation_

$$
\dfrac{\partial^2 u}{\partial x^2}+ \dfrac{\partial^2 u}{\partial y^2}= 0.
$$

Harmonic functions are important in certain branches of applied mathematics.

CMT5.1 If $u$~and~$v$ satisfy the Cauchy--Riemann equations and have continuous second-order partial derivatives, then they are harmonic.Using the Cauchy--Riemann equations and the symmetry of continuous second-order partial derivatives, we see that

$$
\dfrac{\partial^2 u}{\partial x^2}+ \dfrac{\partial^2 u}{\partial y^2}&= \dfrac{\partial}{\partial x}\dfrac{\partial u}{\partial x}+\dfrac{\partial}{\partial y}\dfrac{\partial u}{\partial y}\\&= \dfrac{\partial}{\partial x}\dfrac{\partial v}{\partial y}- \dfrac{\partial}{\partial y}\dfrac{\partial v}{\partial x}\\&= \dfrac{\partial^2 v}{\partial x\partial y}- \dfrac{\partial^2 v}{\partial y\partial x}\\&= 0,
$$

and similarly for $v$.

Let $u,v$ be a pair of real-valued functions with continuous second-order partial derivatives. If $u$~and~$v$ satisfy the Cauchy--Riemann equations, then $v$~is called a _harmonic conjugate_ of~$u$. On reasonable domains, like open discs,every harmonic function has a harmonic conjugate, so that harmonic functions are essentially the same as the real parts of holomorphic functions.

One can find a harmonic conjugate by solving the two Cauchy--Riemann equations successively.

CME5.2 Show that the function $u = x^{3} - 3x y^{2}$ is harmonic, and find a harmonic conjugate.We have

$$
\dfrac{\partial u}{\partial x}= 3x^{2} - 3y^{2}, \quad \dfrac{\partial u}{\partial y}= -6xy.
$$

It follows that $u$~is harmonic, because

$$
\dfrac{\partial^2 u}{\partial x^2}+ \dfrac{\partial^2 u}{\partial y^2}= 6x - 6x = 0.
$$

For $v$ to be a harmonic conjugate, we require

$$
\dfrac{\partial v}{\partial x}= -\dfrac{\partial u}{\partial y}, \quad \dfrac{\partial v}{\partial y}= \dfrac{\partial u}{\partial x},
$$

that is,

$$
\dfrac{\partial v}{\partial x}= 6xy, \quad \dfrac{\partial v}{\partial y}= 3x^{2} - 3y^{2}.
$$

The general solution to the first of these equations is

$$
v = 3x^{2} y + \phi(y),
$$

where $\phi(y)$ is an arbitrary function in~$y$. For $v$~to be a solution to the second equation one then requires $\phi$ to be differentiable and

$$
3x^{2} + \phi'(y) = 3x^{2} - 3y^{2},
$$

which means that $\phi(y) = -y^{3} + k$, where $k$~is constant. Thus the harmonic conjugates~$v$ are given by

$$
v = 3x^{2}y - y^{3} + k,
$$

where $k$~is constant.\
Note that when performing the first antidifferentiation in the above argument one needs $\phi$ to be an arbitrary function, not just an arbitrary constant.

This example shows that there is a holomorphic function~$f$ given by

$$
f(z) = f(x + iy) = w = u + iv = (x^{3} - 3xy^{2}) + i(3x^{2}y - y^{3} + k).
$$

In fact, by the binomial theorem this can be written as $f(z) = z^{3} + ik$.

Heuristically, one can often find a formula for $f(z)$ from the formula for $f(x + iy)$ by replacing~$x$ with~$z$ and replacing~$y$ with~$0$; this is because

$$
\dfrac{dw}{dz}= \dfrac{\partial w}{\partial x}.
$$

### PART II. INTEGRATION

### Introduction to integration

CMS6

An important part of real analysis concerns the integration of functions over closed intervals of the real line. Over the complex numbers we can integrate functions in a similar way, but we now have additional flexibility in choosing the domains we want to integrate over.

We will be interested in the contour integration of functions in the complex plane. Essentially, if $w = u + iv$ is a function of $z = x + iy$ with $u,v,x,y$ real and if $\gamma$~is a path in the complex plane then we will get

$$
\int_{\gamma} w\,dz = \int_{\gamma} (u + iv)(dx +i\,dy) = \int_{\gamma} (u\,dx - v\,dy) + i\int_{\gamma} (v\,dx + u\,dy),
$$

which means that we are dealing with pairs of real line integrals. We will, however, give the definitions independently in a reasonably general form.

CMD6.1 Let $U$ be a subset of~$\mathbb{C}$. A _path_ in~$U$ is a continuous map $\gamma: [a,b] \to U,$ where $[a,b]$ is a closed interval in~$\mathbb{R}$.

Let $\gamma: [a,b] \to U$ be a path. We can approximate the length of~$\gamma$ by sums of the form

$$
\sum_{r = 1}^{n} |\gamma(a_{r}) - \gamma(a_{r - 1})|,
$$

where

$$
a = a_{0} < a_{1} < \cdots < a_{n} = b.
$$

If these sums tend to a finite limit~$L$ as $\max_{r}(a_{r} - a_{r - 1})$ tends to zero, then one says that $\gamma$~has _finite length_~$L$.

If $\gamma$~is of finite length and if $f: U \to \mathbb{C}$ is a continuous function, then the _contour integral_

$$
\int_{\gamma} f(z)\,dz
$$

is obtained from the _Riemann sums_

$$
\sum_{r = 1}^{n} f\bigl(\gamma(t_{r})\bigr)[\gamma(a_{r}) - \gamma(a_{r-1})],
$$

where

$$
a = a_{0} < a_{1} < \cdots < a_{n} = b
$$

is a partition of $[a,b]$, and where

$$
a_{r - 1}\leq t_{r} \leq a_{r},
$$

by taking the limit as $\max_{r}(a_{r} - a_{r - 1}) \to 0$.

We will not give the details of this construction in this course. In the sequel, the paths involved in contour integrals are supposed to be of finite length, even if this is not stated.

Note that the family of Riemann sums is determined by the _contour_ of $\gamma$, that is the points in the image of~$\gamma$, and by the order in which they occur; the precise parametrisation does not matter. Because of this, we tend to specify paths by stating their images and the direction of travel. For example, we may refer to an integral along a straight line segment from~$P$ to~$Q$ or an anticlockwise circular arc; this really means the segment or arc with any convenient parametrisation in the correct direction. Note that the direction of travel must be specified, because of the following result.

CMP6.2 If the direction of travel along a path is reversed, then the integrals along the path are multiplied by~$-1$.The Riemann sums for the reverse direction are obtained from the original Riemann sums by multiplying by~$-1$.

There is a very important and very useful bound for contour integrals, as follows.

CMT6.3 If $\gamma$~is of finite length~$L$ and if $|f(z)| \leq M$ for all points ~$z$ in the image of~$\gamma$, then

$$
\left|\int_{\gamma} f(z)\,dz\right| \leq ML.
$$

For each Riemann sum one has

$$
\left|\sum_{r = 1}^{n} f\bigl(\gamma(t_{r})\bigr)[\gamma(a_{r}) - \gamma(a_{r - 1})]\right|&\leq \sum_{r = 1}^{n} |f\bigl(\gamma(t_{r})\bigr)|\,|\gamma(a_{r}) - \gamma(a_{r - 1})| \\&\leq M\sum_{r = 1}^{n} |\gamma(a_{r}) - \gamma(a_{r - 1})|,
$$

and the result follows by taking the limits as $\max_{r}(a_{r} - a_{r - 1})$ tends to zero.

This result can be used to estimate integrals. The ability to do this is an intended learning objective for Methods in complex analysis but not for Mathematics 3U, and this is the only real difference in the intended learning objectives between the two courses. But the result should be known in any case, because it is frequently used in proofs.

In practice, contour integrals are converted into integrals over intervals in the real line, essentially by change of variables.

CMD6.4 A path~$\gamma$ on $[a,b]$ is a _piecewise $C^{1}$~path_ if $\gamma$ continuously differentiable at all but finitely many points of the interval $[a,b]$.CMP6.5 Let $\gamma: [a,b] \to U$ be a piecewise $C^{1}$~path. Then $\gamma$~has finite length if and only if the absolute value of derivative $|\gamma'|$~has a finite integral over $[a,b]$. If $\gamma$~has finite length, then the length is given by

$$
\int_{a}^{b} |\gamma'(t)|\,dt.
$$

If $\gamma$~has finite length and if $f$~is a continuous function on~$U$, then

$$
\int_{\gamma} f(z)\,dz = \int_{a}^{b} f\bigl(\gamma(t)\bigr)\,\gamma'(t)\,dt.
$$

We will not give a proof of this result. Let us instead take a look at some examples.

CME6.6 Let $\gamma: [a,b] \to \mathbb{C}$ be the path given by

$$
\gamma(\theta) = c + re^{i\theta}
$$

for some $c \in \mathbb{C}$ and $r > 0$. Compute the length of~$\gamma$.We have $\gamma'(\theta) = ire^{i\theta}$, so the length of~$\gamma$ is

$$
\int_{a}^{b} |i re^{i\theta}|\,d\theta = \int_{a}^{b} r\,d\theta = r(b - a).
$$

CME6.7 Let $\gamma$ be the straight line from $1 + i$ to $2 + 3i$. Compute

$$
\int_{\gamma} \bar{z}\,dz.
$$

We can parametrise~$\gamma$ as

$$
\gamma(t) = (1 + i) + [(2 + 3i) - (1 + i)]t = (1 + i) + (1 + 2i)t
$$

for $0 \leq t \leq 1$. Then $\overline{\gamma(t)}= (1 - i) + (1 - 2i)t$ and $\gamma'(t) = 1 + 2i$, so

$$
\int_{\gamma} \bar{z}\,dz = \int_{0}^{1} [(1 - i) + (1 - 2i)t](1 + 2i)\,dt = \int_{0}^{1} (3 + i + 5t)\,dt = [(3 + i)t + \tfrac{5}{2}t^{2}]_{0}^{1} = \tfrac{11}{2}+ i.
$$

Informally, we may write $z = (1 + i) + (1 + 2i)t$ and substitute $dz = (1 + 2i)\,dt$ and $\bar{z}= (1 - i) + (1 - 2i)t$ in $\int_{\gamma} \bar{z}dz$ to calculate the integral.

In general the straight line from~$p$ to~$q$ can be parametrised as

$$
z = p + t(q - p)
$$

for $0 \leq t \leq 1$. Other parametrisations are possible; in particular one does not have to use the interval $[0,1]$.

CME6.8 Let $\gamma: [a, b] \to \mathbb{C}$ be the path given by

$$
\gamma(t) = e^{it},
$$

and let $n$ be an integer. Compute

$$
\int_{\gamma} z^{n}\,dz.
$$

We have

$$
\int_{\gamma} z^{n}\,dz&= \int_{a}^{b} \gamma(t)^{n}\,\gamma'(t)\,dt \\&= \int_{a}^{b} e^{int}ie^{it}\,dt \\&= \int_{a}^{b} ie^{i(n + 1)t}\,dt.
$$

In cases with $n \neq -1$ we get

$$
\int_{\gamma} z^{n}\,dz = \left[\dfrac{e^{i(n + 1)t}}{n + 1}\right]_{a}^{b} = \dfrac{e^{i(n + 1)b} - e^{i(n + 1)a}}{n + 1},
$$

and we get

$$
\int_{\gamma} z^{-1}\,dz = \int_{a}^{b} i\,dt = i(b - a)
$$

in the case $n = -1$.

In order to calculate contour integrals we can often use what amounts to the fundamental theorem of calculus.

CMP6.9 Suppose $\gamma$~is apath in an open set $U \subset \mathbb{C}$ from~$c$ to~$d$ and let $f$ be a continuous function on~$U$ such that $f(z) = F'(z)$ for some differentiable function~$F$ on~$U$, then

$$
\int_{\gamma} f(z)\,dz = [F(z)]_{c}^{d} = F(d) - F(c).
$$

This gives another way to look at Example~CME6.8 in the case $n \neq -1$: since $\gamma$~is a path from~$e^{ia}$ to~$e^{ib}$ in $U = \mathbb{C}\setminus \{0\}$ we have

$$
\int_{\gamma} z^{n}\,dz = \left[\dfrac{z^{n + 1}}{n + 1}\right]_{e^{ia}}^{e^{ib}}= \dfrac{e^{i(n + 1)b} - e^{i(n + 1)a}}{n + 1}.
$$

CMD6.10 A _closed path_ in $U \subset \mathbb{C}$ is a path~$\gamma: [a,b] \to \mathbb{C}$ such that $\gamma(a) = \gamma(b)$.CMP6.11 If $\gamma$~is a closedpath in~$U$ and if $f$~is a continuous function on~$U$ such that $f(z) = F'(z)$ for some differentiable function~$F$ on~$U$, then

$$
\int_{\gamma} f(z)\,dz = 0.
$$

CME6.12 If $\gamma$~is a closedpath in~$\mathbb{C}$ and if $f$~is a polynomial, then

$$
\int_{\gamma} f(z)\,dz=0.
$$

CME6.13 Let $\gamma$ be the circle with centre~$0$ and radius~$1$ traced anticlockwise. By integrating along~$\gamma$, show that there is no function on $\mathbb{C} \setminus \{0\}$ with derivative~$z^{-1}$.We can parametrise~$\gamma$ as $z = e^{it}$ for $0 \leq t \leq 2\pi$. We have

$$
dz = ie^{it}\,dt = iz\,dt,
$$

hence

$$
\int_{\gamma} z^{-1}\,dz = \int_{0}^{2\pi}z^{-1}iz\,dt = \int_{0}^{2\pi}i\,dt = 2\pi i\neq 0.
$$

Since $\gamma$~is a closed path, it follows that $z^{-1}$~cannot have an anti-derivative on $\mathbb{C} \setminus \{0\}$.

### Cauchy's theorem

CMS7

By the fundamental theorem of calculus, the integral along a closed path of a function with an anti-derivative is equal to zero, see Proposition~CMP6.11. Cauchy's theorem says that, under certain circumstances, one gets the same result for functions with derivatives rather than anti-derivatives.

We begin with the special case in which the domain of the closed curve is the boundary of a rectangle.

CMT7.1 Let $f: U \to \mathbb{C}$ be a differentiable function on an open set~$U$ in~$\mathbb{C}$, let $R = [a,b] \times [a',b']$ be a rectangle in~$\mathbb{R}^{2}$ with boundary $\partial R$, and let $\gamma: \partial R \to U$ be a path of finite length such that $\gamma = \Gamma|\partial R$ for some continuous function $\Gamma: R \to U$. Then

$$
\int_{\gamma} f(z)\, dz = 0.
$$

The function~$\Gamma$ may be very far from smooth. However, since $U$~is open and $\gamma$~is of finite length, we have enough wriggle room to change~$\Gamma$ without changing its values on the boundary such that it multiplies lengths by a bounded amount. We assume that this has been done. In particular, let $R'$~is a rectangle contained in~$R$ with boundary $\partial R'$ traced in the same direction as~$\gamma$; then $\Gamma|\partial R'$ is of finite length and we can make the definition

$$
I(R') = \int_{\Gamma|\partial R'}f(z)\,dz.
$$

In this notation, we want to show that $I(R) = 0$.\
Bisect~$R$ horizontally and vertically into four rectangles $S,T,U,V$; then

$$
I(R) = I(S) + I(T) + I(U) + I(V)
$$

because the integrals along edges inside~$R$ cancel out. We can therefore choose one of the small rectangles, $R_{1}$~say, such that

$$
|I(R)| \leq 4 \,|I(R_{1})|.
$$

By repeating this process, we can construct a sequence of rectangles

$$
R \supset R_{1} \supset R_{2} \supset \cdots,
$$

each a quarter of its predecessor, such that

$$
|I(R)| \leq 4^{n}\,|I(R_{n})|.
$$

\
Now let $(s_{n},t_{n})$ be the lower left hand corner of~$R_{n}$. The sequence $s_{1},s_{2}\,\dots\,$ is increasing and bounded above, so it converges to a limit~$s$, and similarly $t_{n}$~converges to a limit~$t$. Let $w = \Gamma(s,t)$; then $w \in \Gamma(R_{n})$ for all~$n$.\
We now use the fact that $f$~is differentiable. For $z \in U \setminus\{w\}$ let

$$
q(z) = \dfrac{f(z) - f(w)}{z - w}- f'(w),
$$

and let $q(w) = 0$; then $q$~is continuous on~$U$ and

$$
f(z) = f(w) + f'(w)(z - w) + q(z)(z - w)
$$

for all $z \in U$. Since the integral of a polynomial along a closed curve is zero (see Example~CME6.12) we have

$$
I(R_{n}) = \int_{\Gamma|\partial R_n}q(z)(z - w)\,dz.
$$

\
Now the linear dimensions of~$R_{n}$ are obtained from those of~$R$ by multiplying by~$2^{-n}$. Since $\Gamma$~multiplies lengths by a bounded amount, there are positive constants $K$~and~$L$ such that the length of $\Gamma|\partial R_{n}$ is at most $2^{-n}K$ and such that $|z - w| \leq 2^{-n}L$ for $z$ in $\Gamma|\partial R_{n}$. We also have $q(z) \to 0$ as $z \to w$, so there are positive constants $M_{n}$ such that $|q(z)| \leq M_{n}$ for $z$ in $\Gamma|\partial R_{n}$ and such that $M_{n} \to 0$ as $n \to \infty$. By Proposition~CMT6.3,

$$
|I(R_{n})| \leq 2^{-n}K2^{-n}LM_{n} = 4^{-n}KLM_{n}.
$$

Since $|I(R)| \leq 4^{n}\,|I(R_{n})|$ and since $M_{n} \to 0$ as $n \to \infty$, it follows that $I(R) = 0$. This completes the proof.

We apply this result to show that in certain circumstances the integrals of a function along different paths are equal.

CMD7.2 Let

$$
\gamma,\delta:[a,b] \to U
$$

be two closed paths with the same domain $[a,b]$ and the same codomain~$U$. Then $\gamma$~and~$\delta$ are _homotopic_ (as closed paths in~$U$) if there is a continuous function

$$
\Gamma: [0,1] \times [a,b] \to U
$$

such that

$$
&\Gamma(0,t) = \gamma(t) \quad (a \leq t \leq b),\\&\Gamma(1,t) = \delta(t) \quad (a \leq t \leq b),\\&\Gamma(s,a) = \Gamma(s,b) \quad (0 \leq s \leq 1).
$$

The function~$\Gamma$ is called a _homotopy_ from~$\gamma$ to~$\delta$.

In this definition, the homotopy~$\Gamma$~is a continuous family of closed paths $\Gamma(s,-)$, one for each point~$s$ in $[0,1]$, starting with $\gamma$ and finishing with~$\delta$.

CMT7.3 Let $f: U \to \mathbb{C}$ be a differentiable function on an open set~$U$ in~$\mathbb{C}$ and let $\gamma$~and~$\delta$ be closed paths in~$U$ of finite length which are homotopic as closed paths in~$U$. Then

$$
\int_{\gamma} f(z)\,dz = \int_{\delta} f(z)\,dz.
$$

By a wriggle room argument, we can find a homotopy whose restriction to the boundary of its domain is of finite length. The integral of~$f$ along its boundary in the appropriate direction is then

$$
\int_{\gamma} f(z)\,dz - \int_{\delta} f(z)\,dz
$$

since the integrals along the other two sides cancel out because the homotopy is a homotopy through closed paths. The result therefore follows from Theorem~CMT7.1.

We use this to generalise Theorem~CMT7.1 as follows. Let us say that a closed path in an open set $U \subset \mathbb{C}$ is _null-homotopic_ in $U$ if it is homotopic to a constant path as a closed path in~$U$. Then the following result is an easy consequence of Theorem~CMT7.3 because an integral along a constant path is obviously equal to zero.

CMT7.4 Let $f: U \to \mathbb{C}$ be a differentiable function on an open set~$U$ in~$\mathbb{C}$ and let $\gamma$ be a closed path in~$U$ which is null-homotopic in~$U$. Then

$$
\int_{\gamma} f(z)\,dz = 0.
$$

In particular we can apply this result to paths which do not cross themselves.

CMD7.5 A _simple closed path_ on an interval $[a,b]$ is a closed path~$\gamma$ such that $\gamma(t_{1}) \neq \gamma(t_{2})$ for $a \leq t_{1} < t_{2} < b$.

Thus a simple closed path is a closed path which is as near to being injective as possible. Note that for a closed path $\gamma$ we have $\gamma(a) = \gamma(b)$ by definition, which means that a closed path cannot be injective.

Let $\gamma$ be a simple closed path in~$\mathbb{C}$. Then the complement of~the image of~$\gamma$ is the union of two disjoint non-empty connected open sets, one of them bounded, one of them unbounded; this is the famous _Jordan curve theorem_. The members of the bounded set are _inside_~$\gamma$, and the members of the unbounded set are _outside_~$\gamma$. If $U$~is an open set containing~$\gamma$ and all the points inside~$\gamma$, then one can show $\gamma$~is homotopic to a constant path in~$U$. As a special case of Theorem~CMT7.4 we therefore get the following result.

CMT7.6 Let $\gamma$ be a simple closed path of finite length in~$\mathbb{C}$, let $U$ be an open set containing~$\gamma$ and all the points inside~$\gamma$, and let $f: U \to \mathbb{C}$ be differentiable. Then

$$
\int_{\gamma} f(z)\,dz = 0.
$$

### Cauchy's integral formulae

CMS8

The theorems in the previous section are very powerful. We will now describe some of their consequences.

If $\gamma$ is a simple closed path in~$\mathbb{C}$ then $\gamma$~may be traced anticlockwise or clockwise. To be more precise, let $U$ be a set containing~$\gamma$ and all the points inside~$\gamma$, and let $z$ be a point inside~$\gamma$. One can show that $\gamma$~is homotopic in $U \setminus \{z\}$ to a small circle with centre~$z$, and one can show that the circles for the various points~$z$ are all traced the same way, either anticlockwise or clockwise. We say that $\gamma$~itself is traced anticlockwise or clockwise accordingly. We will mainly consider paths that are traced anticlockwise, because of the following theorem.

CMT8.1 Let $\gamma$ be a simple closed path in~$\mathbb{C}$ traced anticlockwise, let $U$ be an open set containing~$\gamma$ and all the points inside~$\gamma$, let $f: U \to \mathbb{C}$ be differentiable, and let $z$ be a point inside~$\gamma$. Then

$$
f(z) = \dfrac{1}{2\pi i}\int_{\gamma} \dfrac{f(\zeta)}{\zeta - z}\,d\zeta.
$$

If we write

$$
I = \int_{\gamma} \dfrac{f(\zeta)}{\zeta - z}\,d\zeta
$$

then we must show that $I = 2\pi i f(z)$.\
Let $\delta$ be a circle with centre~$z$ and with small radius~$r$ traced anticlockwise. If $r$~is sufficiently small, then $\gamma$~is homotopic to~$\delta$ in $U \setminus \{z\}$. The function $\zeta \mapsto f(\zeta)/(\zeta - z)$ is differentiable on $U \setminus \{z\}$, so

$$
I = \int_{\delta} \dfrac{f(\zeta)}{\zeta - z}\,d\zeta
$$

by Theorem~CMT7.3.\
We now consider what happens if $f(\zeta)$ is replaced by $f(z)$ in the integral~$I$. We can parametrise~$\delta$ as $\zeta = z + re^{it}$ with $t$ running from~$0$ to $2\pi$, and we get

$$
\int_{\delta}\dfrac{f(z)}{\zeta - z}\,d\zeta = \int_{0}^{2\pi}\dfrac{f(z)}{re^{it}}ire^{it}\,dt = 2\pi if(z).
$$

It follows that

$$
I - 2\pi i f(z) = \int_{\delta} \dfrac{f(\zeta) - f(z)}{\zeta - z}\,d\zeta.
$$

Now the difference quotient $[f(\zeta) - f(z)]/(\zeta - z)$ converges to $f'(z)$ as $\zeta$~tends to~$z$; therefore, if $r$~is sufficiently small we get

$$
\left|\dfrac{f(\zeta) - f(z)}{\zeta - z}\right| \leq |f'(z)| + 1
$$

for all~$\zeta$ in~$\delta$. The length of~$\delta$ is $2\pi r$, so for such~$r$ it follows from Proposition~CMT6.3 that

$$
|I - 2\pi i f(z)| \leq 2 \pi r\bigl(|f'(z)| + 1\bigr).
$$

Since $r$~can be arbitrarily small we conclude that $I = 2 \pi i f(z)$ as required.

In this theorem, the integrand $f(\zeta)/(\zeta - z)$ is infinitely often differentiable with respect to~$z$ for each fixed~$\zeta$ in the path~$\gamma$. One can deduce that $f$~is infinitely often differentiable inside~$\gamma$, with the obvious derivatives. This gives the following generalisation of Theorem CMT8.1.

CMT8.2 Let $\gamma$ be a simple closed path in~$\mathbb{C}$ traced anticlockwise, let $U$ be an open set containing~$\gamma$ and all the points inside~$\gamma$, and let $f: U \to \mathbb{C}$ be differentiable. Then $f$~can be differentiated infinitely often at any point~$z$ inside~$\gamma$, and the derivatives for $n \geq 0$ are given by

$$
f^{(n)}(z) = \dfrac{n!}{2\pi i}\int_{\gamma} \dfrac{f(\zeta)}{(\zeta - z)^{n + 1}}\,d\zeta.
$$

For every point~$z$ in an open set~$U$ there is a disc in~$U$ with centre~$z$. By considering a circle in this disc with centre~$z$, one gets the following result.

CMT8.3 Let $U$ be an open set in~$\mathbb{C}$ and let $f: U \to \mathbb{C}$ be a differentiable function. Then $f$~can be differentiated infinitely often.

This is a very significant difference between complex analysis and real analysis. In fact, in real analysis there are differentiable functions whose derivative is not even continuous, let alone differentiable. A basic example of this phenomenon is the function $f: \mathbb{R} \to \mathbb{R}$ given by

$$
f(x) = \begin{cases}x^{2} \sin(1/x)&x \neq 0 \\ 0&x = 0.\end{cases}
$$

This function is differentiable in the sense of real analysis with

$$
f'(x) = \begin{cases}2x \sin(1/x) - \sin(1/x)&x \neq 0 \\ 0&x = 0.\end{cases}
$$

This can be calculated using the product rule and chain rule as usual if $x \neq 0$, and directly from the definition at $x = 0$.Note that $f'$ is discontinuous at $0$.

### Applications

CME9

We consider holomorphic functions on open discs and on the entire complex plane~$\mathbb{C}$. These functions are not merely infinitely differentiable, as shown in Theorem~CMT8.3; they are equal to the sums of their Taylor series.

In general, if $U \subset \mathbb{C}$ is an open set then a function $f: U \to \mathbb{C}$ is called analytic if it can be locally expressed as a sum of convergent power series. We have already seen in Theorem power that analytic functions are holomorphic. Now we shall establish the converse.

CMT9.1 Let $f$ be a holomorphic function on an open set $U \subset \mathbb{C}$, let $c \in U$ and let $D \subset U$ be an open disc with centre~$c$. Then $f$ is analytic and

$$
f(z) = \sum_{n = 0}^{\infty} \dfrac{f^{(n)}(c)}{n!}(z - c)^{n}
$$

for all $z$ in~$D$.Let

$$
S = \sum_{n = 0}^{\infty} \dfrac{f^{(n)}(c)}{n!}(z - c)^{n};
$$

we must show that $S = f(z)$ for $z \in D$. Let $\gamma$ be a circlein~$D$ with centre~$c$ traced anticlockwise such that $z$~is inside~$\gamma$. From Cauchy's integral formula for derivatives, see Theorem~CMT8.2, one can deduce that

$$
S = \dfrac{1}{2\pi i}\sum_{n = 0}^{\infty} \int_{\gamma} \dfrac{f(\zeta)(z - c)^n}{(\zeta - c)^{n + 1}}\,d\zeta = \dfrac{1}{2\pi i}\int_{\gamma} \sum_{n = 0}^{\infty} \dfrac{f(\zeta)(z - c)^n}{(\zeta - c)^{n + 1}}\,d\zeta,
$$

here the interchange of integration and summation is justified because one can check that the series

$$
\sum_{n = 0}^{\infty} \int_{\gamma} \left|\dfrac{f(\zeta)(z - c)^n}{(\zeta - c)^{n + 1}}\right| d\zeta
$$

is convergent.\
Consider now the expression

$$
\int_{\gamma} \sum_{n = 0}^{\infty} \dfrac{f(\zeta)(z - c)^n}{(\zeta - c)^{n + 1}}\,d\zeta = \int_{\gamma} \sum_{n = 0}^{\infty} \dfrac{f(\zeta)}{\zeta - c}\left(\dfrac{z - c}{\zeta - c}\right)^{n}\,d\zeta.
$$

Since $z$~is inside~$\gamma$, we have

$$
\left|\dfrac{z - c}{\zeta - c}\right| < 1
$$

for each~$\zeta$ on~$\gamma$, so the integrand is an absolutely convergent geometric series with sum given by

$$
\sum_{n = 0}^{\infty} \dfrac{f(\zeta)(z - c)^n}{(\zeta - c)^{n + 1}}= \dfrac{\left[\dfrac{f(\zeta)}{\zeta - c}\right]}{\left[1 - \dfrac{z - c}{\zeta - c}\right]}= \dfrac{f(\zeta)}{\zeta - z}.
$$

Therefore

$$
S = \dfrac{1}{2\pi i}\int_{\gamma} \dfrac{f(\zeta)}{\zeta - z}\,d\zeta,
$$

and Cauchy's integral formula in Theorem~CMT8.1 implies that $S = f(z)$ as required.

Theorem power and Theorem CMT9.1 show that a function $f: U \to \mathbb{C}$ defined on an open set $U \subset \mathbb{C}$ is analytic if and only if it is holomorphic. This is why these two notions are often used interchangeably.

For holomorphic functions on the entire complex plane~$\mathbb{C}$ there is a further key result due to Liouville, given as follows.

CMT9.2 Every non-constant holomorphic function on the entire complex plane~$\mathbb{C}$ is unbounded.Let $f: \mathbb{C} \to \mathbb{C}$ be a bounded holomorphic function, say

$$
|f(z)| \leq M
$$

for all $z \in \mathbb{C}$. We will show that $f$~is constant by showing that $f'(z) = 0$ for all $z \in \mathbb{C}$.\
Indeed, let $\gamma$ be a circle with centre~$z$ and radius~$r$ traced anticlockwise. By Cauchy's integral formula for derivatives, see Theorem~CMT8.2, we have

$$
f'(z) = \dfrac{1}{2\pi i}\int_{\gamma} \dfrac{f(\zeta)}{(\zeta - z)^2}\,d\zeta.
$$

If $\zeta$ is a point on~$\gamma$ then

$$
\left|\dfrac{f(\zeta)}{(\zeta - z)^2}\right| = \dfrac{|f(\zeta)|}{r^2}\leq \dfrac{M}{r^2}.
$$

Since the length of~$\gamma$ is $2\pi r$, it follows from Proposition~CMT6.3 that

$$
|f'(z)| \leq \left(\dfrac{1}{2 \pi}\right) \left(\dfrac{M}{r^2}\right)(2\pi r) = \dfrac{M}{r}.
$$

This is true for all positive numbers~$r$, so $f'(z) = 0$ as required.CME9.3 Let $f$ be an holomorphic function on~$\mathbb{C}$ such that $\mathop{\textup{Re}}(f(z)) \geq 0$ for all $z \in \mathbb{C}$. Show that $f$~is constant.Let $g(z) = e^{-f(z)}$; then $g$~is a holomorphic function on~$\mathbb{C}$ such that $|g(z)| \leq 1$ for all $z \in \mathbb{C}$. By Liouville's theorem, $g$~is constant. Since $f$~is continuous, $f$~is constant.

### Laurent series

CMS10

Let $c$ be a point in~$\mathbb{C}$, let $U$ be an open disc with centre~$c$ or let $U = \mathbb{C}$, let $f$ be a holomorphic function on~$U$, and let $\gamma$ be a circle in~$U$ with centre~$c$ traced anticlockwise. By Cauchy's integral formula for derivatives, Theorem~CMT8.2, we have

$$
f^{(n)}(c) = \dfrac{n!}{2\pi i}\int_{\gamma}\dfrac{f(\zeta)}{(\zeta - c)^{n + 1}}\,d\zeta
$$

for all $n \geq 0$. The Taylor series

$$
f(z) = \sum_{n = 0}^{\infty} \dfrac{f^{(n)}(c)}{n!}(z - c)^{n},
$$

which is valid for all~$z$ in~$U$ by Theorem~CMT9.1, therefore takes the form

$$
f(z) = \sum_{n = 0}^{\infty} a_{n}(z - c)^{n}
$$

with

$$
a_{n} = \dfrac{1}{2\pi i}\int_{\gamma}\dfrac{f(\zeta)}{(\zeta - c)^{n + 1}}\,d\zeta.
$$

In this form, there is a simple generalisation to functions~$f$ which are holomorphic only on $U \setminus\{c\}$: we use the terms $a_{n}(z - c)^{n}$ for all integers~$n$, both positive and negative. The resulting series is like a power series, except that it involves both positive and negative powers. Series of this kind are called _Laurent series;_ thus a Laurent series is a series of the form

$$
\sum_{n = -\infty}^{\infty} a_{n}(z - c)^{n}.
$$

One can write a Laurent series as the sum of a power series in $z - c$ and a power series in $1/(z - c)$,

$$
\sum_{n = -\infty}^{\infty} a_{n}(z - c)^{n} = \sum_{n = 0}^{\infty} a_{n}(z - c)^{n} + \sum_{m = 1}^{\infty} a_{-m}[1/(z - c)]^{m};
$$

by definition, the Laurent series is convergent if and only if these two power series are both convergent.

CMT10.1 Let $c$ be a point in~$\mathbb{C}$, let $U$ be an open disc with centre~$c$ or let $U = \mathbb{C}$, let $f$ be a holomorphic function on $U \setminus \{c\}$, let $\gamma$ be a circle in~$U$ with centre~$c$ traced anticlockwise, and let $z$ be a point in $U \setminus \{c\}$. Then

$$
f(z) = \sum_{n = -\infty}^{\infty} a_{n}(z - c)^{n},
$$

where

$$
a_{n} = \dfrac{1}{2\pi i}\int_{\gamma} \dfrac{f(\zeta)}{(\zeta - c)^{n + 1}}\,d\zeta
$$

for all $n \in \mathbb{Z}$.Let

$$
S^{+}&= \dfrac{1}{2\pi i}\int_{\gamma} \sum_{n = 0}^{\infty} \dfrac{f(\zeta)(z - c)^n}{(\zeta - c)^{n + 1}}\,d\zeta, \\ S^{-}&= \dfrac{1}{2\pi i}\int_{\gamma} \sum_{m = 0}^{\infty} \dfrac{f(\zeta)(z - c)^{-m - 1}}{(\zeta - c)^{-m}}\,d\zeta;
$$

we must show that

$$
S^{+} + S^{-} = f(z).
$$

\
To evaluate~$S^{+}$, let $\gamma^{+}$ be a circle in~$U$ with centre~$c$ traced anticlockwise such that $z$~is inside~$\gamma^{+}$. Then $\gamma$~is homotopic to~$\gamma^{+}$ in $U \setminus \{c\}$; hence, by Theorem~CMT7.3,

$$
S^{+} = \dfrac{1}{2\pi i}\int_{\gamma^+}\sum_{n = 0}^{\infty} \dfrac{f(\zeta)(z - c)^n}{(\zeta - c)^{n + 1}}\,d\zeta.
$$

As in the proof of Theorem~CMT9.1, it follows that

$$
S^{+} = \dfrac{1}{2\pi i}\int_{\gamma^+}\dfrac{f(\zeta)}{\zeta - z}\,d\zeta.
$$

\
To evaluate~$S^{-}$, let $\gamma^{-}$ be a circle in~$U$ with centre~$c$ traced anticlockwise such that $z$~is _outside_~$\gamma^{-}$. We now get

$$
S^{-} = \dfrac{1}{2\pi i}\int_{\gamma^-}\sum_{m = 0}^{\infty} \dfrac{f(\zeta)(z - c)^{-m - 1}}{(\zeta - c)^{-m}}\,d\zeta = \dfrac{1}{2\pi i}\int_{\gamma^-}\sum_{m = 0}^{\infty} \dfrac{f(\zeta)(\zeta - c)^m}{(z - c)^{m + 1}}\,d\zeta.
$$

The series in the integrand is a convergent geometric series because $z$~is outside~$\gamma^{-}$, so that

$$
\left|\dfrac{\zeta - c}{z - c}\right| < 1
$$

for all~$\zeta$ on~$\gamma^{-}$. The sum is now given by

$$
\sum_{m = 0}^{\infty} \dfrac{f(\zeta)(\zeta - c)^m}{(z - c)^{m + 1}}= \dfrac{\left[\dfrac{f(\zeta)}{z - c}\right]}{\left[1 - \dfrac{\zeta - c}{z - c}\right]}= \dfrac{f(\zeta)}{z - \zeta}= -\dfrac{f(\zeta)}{\zeta - z},
$$

so that

$$
S^{-}= -\dfrac{1}{2\pi i}\int_{\gamma^-}\dfrac{f(\zeta)}{\zeta - z}\,d\zeta.
$$

\
Recall now from Proposition~CMP6.2 that changing the sign of a contour integral is equivalent to reversing the direction of travel. Let $\sigma$ be a closed path in~$U$ consisting of the circle~$\gamma^{+}$ traced anticlockwise, a path~$\lambda$ from a point on~$\gamma^{+}$ to a point on~$\gamma^{-}$, the circle~$\gamma^{-}$ traced clockwise, and the path~$\lambda$ traced in reverse; then we see that

$$
S^{+} + S^{-} = \dfrac{1}{2\pi i}\int_{\sigma} \dfrac{f(\zeta)}{\zeta - z}\,d\zeta.
$$

We now shrink this path slightly to get an anticlockwise simple closed path~$\tau$ homotopic to~$\sigma$ in $U \setminus \{c,z\}$ such that $z$~is inside~$\tau$. By Theorem~CMT7.3,

$$
S^{+} + S^{-} = \dfrac{1}{2\pi i}\int_{\tau} \dfrac{f(\zeta)}{\zeta - z}\,d\zeta;
$$

hence, by Cauchy's integral formula, see Theorem~CMT8.1, we get $S^{+} +S^{-} = f(z)$ as required.

### Singularities

CMS11

Let $f$ be a holomorphic function on $U \setminus \{c\}$, where $U \subset \mathbb{C}$~is an open set containing ~$c$. In this case one says that $f$ has an _isolated singularity_ at~$c$. By Theorem~CMT10.1 there is a Laurent series expansion

$$
f(z) = \sum_{n = -\infty}^{\infty} a_{n}(z - c)^{n}
$$

for all~$z$ sufficiently close to~$c$.

CMD11.1 With $f$ and $c$ as above there are the following three mutually exclusive possibilities.

1. Suppose that $a_{n} = 0$ for all $n < 0$. Then the series is a power series in the ordinary sense, with a non-zero radius of convergence. In particular it has the sum~$a_{0}$ at $z = c$. One can therefore extend~$f$ to a holomorphic function on~$U$ by putting $f(c) = a_{0}$. One says that $f$~has a _removable singularity_ at~$c$.

2. Suppose that $a_{n}$~is non-zero for for some negative values of~$n$, but only for finitely many, so that the Laurent series has the form

   $$
   \sum_{n = -N}^{\infty} a_{n}(z - c)^{n} = (z - c)^{-N}[a_{-N}+ a_{-N + 1}(z - c) + \cdots\,]
   $$

   with $N > 0$ and $a_{-N}\neq 0$. One says that $f$~has a _pole_ of order~$N$ at~$c$. In this case,

   $$
   f(z) = \dfrac{g(z)}{(z - c)^N}
   $$

   for some function~$g$ which is holomorphic on~$U$ and non-zero at~$c$.

3. Suppose that $a_{n}$~is non-zero for infinitely many negative values of~$n$. Then $f$~has an _isolated essential singularity_ at~$c$.

Let us consider examples for all three types of isolated singularities as introduced in Definition CMD11.1.

CME11.4 The function

$$
f(z) = \dfrac{\sin(z)}{z}&= \dfrac{1}{z}\left(z - \dfrac{z^3}{3!}+ \dfrac{z^5}{5!}- \cdots\,\right) \\&= 1 - \dfrac{z^2}{3!}+ \dfrac{z^4}{5!}- \cdots
$$

has a removable singularity at $z = 0$ and can be made holomorphic at~$0$ by giving it the value~$1$ at that point. We have $f(z) \to 1$ as $z \to 0$, so $|f(z)|$ is bounded on some neighbourhood of~$0$.\
The function

$$
g(z) = \dfrac{z + 2}{(z - 3)(z + 5)^2}
$$

has a pole of order~$1$ (a _simple pole_) at $z = 3$, and a pole of order~$2$ (a _double pole_) at $z = -5$. Obviously $|g(z)| \to \infty$ when $z \to 3$ or $z \to -5$.\
The function

$$
h(z) = e^{1/z}= 1 + z^{-1}+ \dfrac{z^{-2}}{2!}+ \cdots
$$

has an isolated essential singularity at $z = 0$. If $z \to 0$ through positive real values, then $|h(z)| \to \infty$; if $z \to 0$ through negative real values then $|h(z)| \to 0$. For $z$~tending to~$0$ through arbitrary complex numbers, $|h(z)|$ is not bounded but does not tend to infinity either.

Singularities can always be classified by the behaviour of the absolute value as in these examples.

CMT11.5 Let $U \subset \mathbb{C}$ be an open set and let $f$ be a holomorphic function on $U \setminus \{c\}$, so that $f$ has an isolated singularity at~$c$.

1. The singularity is removable if and only if $f$~is bounded on some neighbourhood of~$c$.

2. The singularity is a pole if and only if $|f(z)| \to \infty$ as $z \to c$.

3. The singularity is an isolated essential singularity if and only if $f$~is unbounded on any neighbourhood of~$c$ and $|f(z)|$ does not tend to infinity as $z$~tends to~$c$.

(1) If the singularity is removable, then obviously $f$~is bounded on some neighbourhood of~$c$.\
Conversely, suppose that $f$~is bounded on some neighbourhood, say $|f(z)| \leq M$ for all $z$ sufficiently close to~$c$. Let the Laurent series of $f$ be

$$
\sum_{n = -\infty}^{\infty} a_{n}(z - c)^{n},
$$

so that

$$
a_{n} = \dfrac{1}{2\pi i}\int_{\gamma} \dfrac{f(\zeta)}{(\zeta - c)^{n + 1}}\,d\zeta
$$

for any anticlockwise circle~$\gamma$ with centre~$c$ and with sufficiently small radius~$r$. If $\zeta$~is in~$\gamma$, then

$$
\left|\dfrac{f(\zeta)}{(\zeta - c)^{n + 1}}\right| = \dfrac{|f(\zeta)|}{r^{n + 1}}\leq \dfrac{M}{r^{n + 1}},
$$

and the length of~$\gamma$ is $2\pi r$, so it follows from Proposition~CMT6.3 that

$$
|a_{n}| \leq \dfrac{1}{2\pi}\dfrac{M}{r^{n + 1}}(2\pi r) = Mr^{-n}.
$$

If $n < 0$, then $r^{-n}\to 0$ as $r \to 0$, so $a_{n} = 0$. Therefore the singularity is removable.\
(2) If the singularity is a pole, then we obviously have $|f(z)| \to \infty$ as $z \to c$. Indeed, if $c$ is a pole of order $N$ then we can write

$$
f(z) = \sum_{n = -N}^{\infty} a_{n}(z - c)^{n} = (z - c)^{-N}[a_{-N}+ a_{-N + 1}(z - c) + \cdots\,]
$$

and since $\lim_{z \to c}(a_{-N}+ a_{-N + 1}(z - c) + \cdots\,) = a_{-N}$, the behaviour of $f$ near $c$ is determined by the factor $(z - c)^{-N}$.\
Conversely, suppose that $|f(z)| \to \infty$ as $z \to c$. Then there is an open disc~$D$ with centre~$c$ such that $|f(z)| > 1$ for $z \in D \setminus\{c\}$. It follows that $1/f$~is defined on $D \setminus\{c\}$ and is bounded on that set, so $1/f$ has a removable singularity at~$c$ by part~(1). Since $1/f(z) \to 0$ as $z \to c$, and since $1/f(z) \neq 0$ for $z \neq c$, looking at the Taylor series of $1/f$ at~$c$ shows that there exists $N > 0$ such that

$$
\dfrac{1}{f(z)}= (z - c)^{N}[a_{N} + a_{N + 1}(z - c) + \cdots\,]
$$

with $a_{N} \neq 0$. Therefore $1/f(z) = (z - c)^{N} g(z)$ with $g$ holomorphic and non-zero near~$c$, hence $f(z) = (z - c)^{-N}h(z)$ with $h$ holomorphic and non-zero near~$c$. Since $N > 0$ we conclude that $f$~has a pole of at~$c$.\
(3) This follows from parts (1)~and~(2).

### The calculus of residues

CMS12

Assume $f$ is a holomorphic function on an open set $U \setminus \{c\}$. In the Laurent series expansion

$$
f(z) = \sum_{n = -\infty}^{\infty} a_{n}(z - c)^{n},
$$

see Theorem~CMT10.1, the coefficient~$a_{-1}$ has the particularly simple expression

$$
a_{-1}= \dfrac{1}{2\pi i}\int_{\gamma} f(z)\,dz,
$$

where $\gamma$~is a suitable circle. This coefficient has a special name, and is of special importance for calculating integrals.

CMD12.1 If a holomorphic function~$f$ has an isolated singularity at~$c$, then the _residue_ of~$f$ at~$c$, denoted $\textup{res}(f,c)$, is the coefficient of $(z - c)^{-1}$ in the Laurent series of $f(z)$ at~$c$.CMT12.2 Let $U$ be an open set in~$\mathbb{C}$, let $f: U \to \mathbb{C}$ be holomorphic, and let $\gamma$ be an anticlockwise simple closed path in~$U$ such that there are finitely many points $c_{1}, \dots, c_{k}$ inside~$\gamma$ not belonging to~$U$. Then

$$
\int_{\gamma} f(z)\,dz = 2\pi i[\textup{res}(f,c_{1}) + \cdots + \textup{res}(f,c_{k})].
$$

Let $D_{1}, \dots, D_{k}$ be disjoint open discs inside~$\gamma$ with their centres at $c_{1}, \dots, c_{k}$. One can show that $\gamma$~is homotopic in~$U$ to a path consisting of arcs making up the boundaries $\gamma(j)$ of these discs traced anticlockwise and of connecting paths traced twice in opposite directions. The integrals along the connecting paths cancel out by Proposition~CMP6.2. It therefore follows from Theorem~CMT7.3 that

$$
\int_{\gamma} f(z)\,dz = \sum_{j = 1}^{k} \int_{\gamma(j)}f(z)\,dz = \sum_{j = 1}^{k} 2\pi i\textup{res}(f,c_{j}).
$$

This yields the claim.

Theorem CMT12.2 generalises Cauchy's Theorem ~CMT7.6, which is the case with no singularities, and Cauchy's integral formulae, see Theorems~CMT8.1 and~CMT8.2, which are cases with one singularity.

In order to apply the residue theorem, it is necessary to calculate residues. This can sometimes be done by direct computations of Laurent series. For poles there is a useful general result as follows.

CMP12.3 If $f$~has a pole of order at most~$m$ at~$c$ then

$$
\textup{res}(f,c) = \dfrac{1}{(m - 1)!}\lim_{z \to c}\dfrac{d^{m - 1}}{dz^{m - 1}}[(z - c)^{m} f(z)].
$$

In particular, if $f$~has a simple pole at~$c$ then

$$
\textup{res}(f,c) = \lim_{z \to c}[(z - c)f(z)].
$$

Let $g(z) = (z - c)^{m} f(z)$, so that $g$~is holomorphic at~$c$, and let the Taylor series of~$g$ at~$c$ be $a_{0} + a_{1}(z - c) + \cdots\,$. The Laurent series of~$f$ is then given by

$$
f(z)&= \dfrac{1}{(z - c)^m}g(z) \\&= \dfrac{1}{(z - c)^m}[a_{0} + a_{1}(z - c) + \cdots + a_{m - 1}(z - c)^{m - 1}+ \cdots\,] \\&= a_{0}(z - c)^{-m}+ a_{1}(z - c)^{-m + 1}+ \cdots + a_{m - 1}(z - c)^{-1}+ \cdots,
$$

so that that $\textup{res}(f,c) = a_{m - 1}$. Therefore

$$
\textup{res}(f,c) = \dfrac{g^{(m - 1)}(c)}{(m - 1)!}= \lim_{z \to c}\dfrac{g^{(m - 1)}(z)}{(m - 1)!}= \dfrac{1}{(m - 1)!}\lim_{z \to c}\dfrac{d^{m - 1}}{dz^{m - 1}}[(z - c)^{m} f(z)]
$$

as claimed.

Proposition CMP12.3 can sometimes be combined with l'Hopital's rule.

CMP12.4 If $f$~and~$g$ are holomorphic function on an open set $U \subset \mathbb{C}$ and $f(c) = 0 = g(c)$ for some $c \in U$ then

$$
\lim_{z \to c}\dfrac{f(z)}{g(z)}= \lim_{z \to c}\dfrac{f'(z)}{g'(z)}.
$$

Sometimes it is possible to use partial fractions to calculate residues.

CME12.5 Find the residues of the following functions at their singularities:

$$
f(z)&= \dfrac{1}{z^3 - 1}, \\ g(z)&= \dfrac{z^2 + 5z + 3}{z(z + 1)^2}, \\ h(z)&= \dfrac{\sin(z)}{z^6}, \\ k(z)&= \dfrac{1}{z - 1}+ \dfrac{3z + 1}{(z - 2)^2}+ \dfrac{3}{z - 4}.
$$

The singularities of~$f$ are simple poles at $1, e^{2\pi i/3}, e^{4\pi i/3}$. For each singularity~$c$, by Proposition~CMP12.3,

$$
\textup{res}(f,c) = \lim_{z \to c}\dfrac{z - c}{z^3 - 1}.
$$

By l'Hopital's rule,

$$
\textup{res}(f,c) = \lim_{z \to c}\dfrac{\dfrac{d}{dz}(z - c)}{\dfrac{d}{dz}(z^3 - 1)}= \lim_{z \to c}\dfrac{1}{3z^2}= \dfrac{1}{3c^2}.
$$

\
The singularities of~$g$ are a simple pole at~$0$ and a double pole at~$-1$. By Proposition~CMP12.3,

$$
\textup{res}(g,0) = \lim_{z \to 0}zg(z) = 3
$$

and

$$
\textup{res}(g,-1) = \lim_{z \to -1}\dfrac{d}{dz}\dfrac{z^2 + 5z + 3}{z}= \lim_{z \to -1}(1 - 3z^{-2}) = -2.
$$

\
The only singularity of~$h$ is at~$0$. The Laurent series at~$0$ is

$$
z^{-6}\left(z - \dfrac{z^3}{3!}+ \dfrac{z^5}{5!}- \cdots\,\right) = z^{-5}- \tfrac{1}{6}z^{-3}+ \tfrac{1}{120}z^{-1}- \cdots,
$$

so $\textup{res}(h,0) = \tfrac{1}{120}$.\
The singularities of~$k$ are at $1,2$ and~$4$. The Laurent series can be found by adding the Laurent series for the individual partial fractions. The terms involving negative powers in the Laurent series are

$$
&(z - 1)^{-1}, \\&\dfrac{3z + 1}{(z - 2)^2}= \dfrac{3(z - 2) + 7}{(z - 2)^2}= 7(z - 2)^{-2}+ 3(z - 2)^{-1}, \\&3(z - 4)^{-1},
$$

so $\textup{res}(k,1) = 1, \textup{res}(k,2) = 3, \textup{res}(k,4) = 3$.CME12.6 Evaluate

$$
\int_{\gamma} k(z)\,dz,
$$

where

$$
k(z) = \dfrac{1}{z - 1}+ \dfrac{3z + 1}{(z - 2)^2}+ \dfrac{3}{z - 4}
$$

and $\gamma$~is the boundary of the square with vertices at $\pm 3 \pm 3i$ traced anticlockwise.The singularities of~$k$ inside~$\gamma$ are at $1$~and~$2$, so

$$
\int_{\gamma} k(z)\,dz = 2\pi i[\textup{res}(k,1) + \textup{res}(k,2)] = 2\pi i(1 + 3) = 8\pi i,
$$

using the results from Example CME12.5.CMR12.7 There is a generalisation of the residue theorem to arbitrary closed paths with essentially the same proof. If $\gamma$~is any closed path in~$\mathbb{C}$ and if $c$~is a point not in the image of~$\gamma$ then there is a _winding number_

$$
w(\gamma,c) = \dfrac{1}{2\pi i}\int_{\gamma} \dfrac{1}{z - c}\,dz,
$$

which is an integer and is the number of times that $\gamma$~goes round~$c$ in the anticlockwise direction. If $U$~is open in~$\mathbb{C}$, if $f$~is holomorphic on~$U$, if $\gamma$~is a closed path in~$U$, and if there are finitely many points $c_{1}, \dots, c_{k}$ with non-zero winding number not belonging to~$U$, then

$$
\int_{\gamma} f(z)\,dz = 2\pi i[w(\gamma,c_{1})\textup{res}(f,c_{1}) + \cdots + w(\gamma,c_{k})\textup{res}(f,c_{k})].
$$

### Applications to integrals over real intervals

CMS13

The calculus of residues can be used to evaluate certain integrals of real functions over real intervals. One example is the famous Gaussian integral

$$
\int_{-\infty}^{\infty} e^{-x^2}\,dx=\sqrt{\pi},
$$

but we will not explain how to derive this formula using residues here.

We will consider integrals of two other types. Firstly, integrals of the form

$$
\int_{0}^{2\pi}f(\theta)\,d\theta,
$$

such that $f$~is periodic with period $2\pi$ can sometimes be evaluated by the substitution $z = e^{i\theta}$.

CME13.1 Compute the integral

$$
I = \int_{0}^{2\pi}\dfrac{1}{5 - 4\cos(\theta)}\,d\theta.
$$

Make the change of variable $z = e^{i\theta}$, so that

$$
\cos(\theta)&= \tfrac{1}{2}(e^{i\theta}+ e^{-i\theta}) = \tfrac{1}{2}(z+z^{-1}), \\ dz&= ie^{i\theta}d\theta = iz\,d\theta, \\ d\theta&= -i\,\dfrac{dz}{z}.
$$

Let $\gamma$ be the circle with centre~$0$ and radius~$1$ traced anticlockwise; then

$$
I = \int_{\gamma}\dfrac{-i}{5 - 2(z + z^{-1})}\dfrac{dz}{z}= \int_{\gamma} \dfrac{i}{2(z - \tfrac{1}{2})(z - 2)}\,dz.
$$

The integrand is holomorphic on~$\gamma$ and has one singularity inside~$\gamma$, at~$\tfrac{1}{2}$. The residue at~$\tfrac{1}{2}$ is

$$
\dfrac{i}{2(\tfrac{1}{2} - 2)}= -\tfrac{1}{3}i,
$$

see Proposition~CMP12.3. Therefore

$$
I = 2\pi i(-\tfrac{1}{3}i) = \tfrac{2}{3}\pi
$$

by the residue theorem.

Let $f$ be a function such that $z^{2} f(z)$ is bounded for large values of~$|z|$. The integral

$$
\int_{-\infty}^{\infty} f(x)\,dx
$$

is convergent by comparison with

$$
\int_{-\infty}^{\infty} \dfrac{1}{1 + x^2}\,dx = \lim_{R,S \to \infty}[\tan^{-1}x]_{-S}^{R} = \pi;
$$

in fact

$$
\int_{-\infty}^{\infty} f(x)\,dx = \lim_{R \to \infty}\int_{-R}^{R} f(x)\,dx.
$$

This limit can sometimes be computed by integrating round the half-discs

$$
\{z \mid |z| \leq R,\ \mathop{\textup{Im}}(z) \geq 0 \};
$$

the boundedness condition on $z^{2} f(z)$ ensures that $z f(z) \to 0$ as $|z| \to \infty$, and from this it follows that the integrals along the semicircular parts of the boundaries of the half-discs tend to zero.

CME13.2 Compute the integral

$$
I = \int_{-\infty}^{\infty} \dfrac{1}{(x^2 + 1)(x^2 + 4)}\,dx.
$$

Let

$$
f(z) = \dfrac{1}{(z^2 + 1)(z^2 + 4)}= \dfrac{1}{(z + i)(z - i)(z + 2i)(z - 2i)}.
$$

For $R > 2$, let

$$
I_{R} = \int_{\gamma} f(z)\,dz,
$$

where $\gamma$~is the boundary of the upper half of the disc with centre~$0$ and radius~$R$. There are no singularities of~$f$ on~$\gamma$, and the singularities inside~$\gamma$ are at $i$~and~$2i$. By Proposition~CMP12.3,

$$
\textup{res}(f,i)&= \dfrac{1}{(i + i)(i + 2i)(i - 2i)}= -\tfrac{1}{6}i, \\ \textup{res}(f,2i)&= \dfrac{1}{(2i + i)(2i - i)(2i + 2i)}= \tfrac{1}{12}i,
$$

therefore we get

$$
I_{R} = 2\pi i(-\tfrac{1}{6}i + \tfrac{1}{12}i) = \tfrac{1}{6}\pi.
$$

\
The semicircular part of~$\gamma$ has length $\pi R$; hence by Proposition~CMT6.3 the absolute value along the semicircular part of~$\gamma$ is at most

$$
\pi R \max_{|z| = R}|f(z)|.
$$

This clearly tends to zero as $R$~tends to infinity, because $|f(z)|$~is approximately $1/R^{4}$ for $|z| = R$ when $R$~is large. The integral along the straight line part of~$\gamma$ is

$$
\int_{-R}^{R} f(x)\,dx,
$$

which tends to~$I$ as $R$~tends to infinity, because $z^{2} f(z)$ is bounded for large values of~$|z|$. Therefore we get

$$
I = \tfrac{1}{6}\pi
$$

for the value of the integral.

In examples of this kind, students in Methods in complex analysis must prove that the integral along the semicircle tends to zero as the radius tends to infinity; students in Mathematics~3U may assume this without proof.

### PART III. CONFORMAL TRANSFORMATIONS

### Introduction to conformal transformations

CMS14

Let $f: U \to V$ be a bijective function between open sets in~$\mathbb{C}$. We say that $f$~is _conformal_ if $f$~preserves oriented angles between (the tangents to) intersecting curves. It turns out that this condition is equivalent to $f$ being holomorphic with everywhere non-zero derivative.

A function from~$\mathbb{C}$ to~$\mathbb{C}$ is an orientation-preserving isometry if and only if it is a composite of rotations and translations. Analogously, one can show that a function from~$\mathbb{C}$ to~$\mathbb{C}$ preserves oriented angles between straight lines if and only if it is a composite of rotations, translations and _scalings_, where a scaling is a function of the form

$$
z \mapsto Kz
$$

for some positive real constant~$K$. Given arbitrary points $c$~and~$d$, one can deduce that the functions from~$\mathbb{C}$ to~$\mathbb{C}$ preserving oriented angles between straight lines and taking~$c$ to~$d$ are the functions of the form

$$
z \mapsto d + Ke^{i\phi}(z - c)
$$

with $K,\phi \in \mathbb{R}$, and with $K > 0$. In other words, they are the functions

$$
z \mapsto d + k(z - c)
$$

with $d,k \in \mathbb{C}$ and with~$k \neq 0$.

Conformal functions are functions of approximately this form in the neighbourhood of each given point; in other words, they are the holomorphic functions with everywhere non-zero derivatives.

One can show that a holomorphic function with non-zero derivative is locally a bijection. That is, if $f$ is holomorphic and $f'(c) \neq 0$ for some $c$ then there exists an open neighborhood $U$ of $c$ and an open set $V \subset \mathbb{C}$ such that $f: U \rightarrow V$ is a bijection. We give the following definition.

CMD14.1 Let $U$~and~$V$ be open subsets of~$\mathbb{C}$. A _conformal transformation_ from~$U$ to~$V$ is a bijective holomorphic function from~$U$ to~$V$. One says that $U$~and~$V$ are _conformally equivalent_ if there is a conformal transformation from~$U$ to~$V$.

One can show that an injective holomorphic function has everywhere non-zero derivatives. Since injective holomorphic functions have non-zero derivatives we have the following result.

CMP14.2 If $f: U \to V$ is a conformal transformation, then $f'(c) \neq 0$ for all $c \in U$.

Recall that an equivalence relation on a set $X$ is a binary relation which is reflexive, symmetric, and transitive. If we write the relation in the form $x \sim y$ for $x,y \in X$ then this means

- $x \sim x$ for all $x \in X$ (Reflexivity)

- $x \sim y \iff y \sim x$ for all $x,y \in X$ (Symmetry)

- $x \sim y, y \sim z \implies x \sim z$ for all $x,y,z \in X$ (Transitivity).

Let us verify that conformal equivalence is indeed an equivalence relation in a natural way.

CMP14.3 Conformal equivalence is an equivalence relation on the set of all open subsets of~$\mathbb{C}$.Let $U$ be an open subset of~$\mathbb{C}$. Then the identity is a conformal transformation from~$U$ to~$U$, so $U$~is conformally equivalent to~$U$. This shows reflexivity.\
To check symmetry suppose that $U$~is conformally equivalent to~$V$, so that there is a bijective holomorphic function $f: U \to V$. The inverse $g: V \to U$ is a bijection such that

$$
f\bigl(g(y)\bigr) = y
$$

for all $y \in V$. Differentiating this equation implicitly gives

$$
f'\bigl(g(y)\bigr)g'(y) = 1,
$$

so that $g$~is differentiable with

$$
g'(y) = f'\bigl(g(y)\bigr)^{-1};
$$

this argument is valid because $f'\bigl(g(y)\bigr) \neq 0$ by Proposition~CMP14.2. Therefore $V$~is conformally equivalent to~$U$.\
Finally, to verify transitivity suppose that $U$~is conformally equivalent to~$V$ and that $V$~is conformally equivalent to~$W$, so that there are conformal transformations

$$
f: U \to V,\quad g: V \to W.
$$

It follows from the chain rule that $g \circ f$ is a conformal transformation from~$U$ to~$W$; therefore $V$~is conformally equivalent to~$W$.\
We conclude that conformal equivalence therefore has the three properties required for an equivalence relation.

If $f:U \to V$ is a conformal transformation, then the holomorphic functions on~$U$ are the functions $g \circ f$ such that $g$~is holomorphic on~$V$, hence the harmonic functions on~$U$ are the functions $h \circ f$ such that $h$~is harmonic on~$V$, see Section~CMS5. One can therefore, for instance, analyse fluid flows round a subset of~$U$ in terms of flows round the possibly simpler image in~$V$.

CME14.4 Suppose that

$$
w = z + \dfrac{1}{z}.
$$

Then the exterior of a circle passing through~$-1$ and with radius greater than~$2$ in the $z$-plane corresponds to the exterior of a set in the $w$-plane resembling the outline of an aeroplane wing and called a _Joukowski aerofoil_. It has a cusp at the left and a vertical tangent at the right. The top is convex. The bottom is concave at the left and convex at the right. This idea is used in the design of aeroplanes.CME14.5 Find conformal transformations between the sets

$$
H&= \{z \mid \mathop{\textup{Im}}(z) > 0\}, \\ D&= \{z \mid |z| < 1\}, \\ W_{\alpha}&= \{z \mid 0 < \arg(z) < \alpha\} \quad (0 < \alpha \leq 2\pi), \\ S&= \{z \mid 0 < \mathop{\textup{Im}}(z) < 2\pi\}.
$$

There is a conformal transformation $\theta$ from~$H$ to~$D$ given by

$$
z \mapsto \theta(z) = \dfrac{z - i}{z + i},
$$

with inverse

$$
w \mapsto \dfrac{i(1 + w)}{1 - w}.
$$

Note that $\theta$ is well-defined since

$$
|\theta(z)| < 1&\iff |z - i| < |z + i| \\&\iff |z - i|^{2} < |z + i|^{2} \\&\iff x^{2} + (y - 1)^{2} < x^{2} + (y + 1)^{2} \\&\iff -2y < 2y \\&\iff y > 0
$$

where $z = x + i y$.\
There is a conformal transformation from~$H$ to~$W_{\alpha}$ given by

$$
re^{i\theta}\mapsto r^{\alpha/\pi}e^{i\alpha\theta/\pi}\quad (r > 0, 0 < \theta < \pi),
$$

corresponding to a choice of $z \mapsto z^{\alpha/\pi}$.\
There is a conformal transformation from~$S$ to~$W_{2\pi}$ given by $z \mapsto e^{z}$.CME14.6 Find a conformal transformation from~$A$ to~$B$, where

$$
A&= \{z \mid 0 < \mathop{\textup{Re}}(z) < 1\}, \\ B&= \{z \mid \mathop{\textup{Im}}(z) > 0\}.
$$

Note that $z \in B$ if and only if $0 < \arg(z) < \pi$. The exponential function converts bounds on imaginary parts into bounds on arguments, because $\mathop{\textup{Im}}(z)$ is the argument of $e^{z}$. The function $z \mapsto iz$ converts bounds on real parts into bound on imaginary parts. Thus

$$
0 < \mathop{\textup{Re}}(z) < 1&\iff 0 < \mathop{\textup{Im}}(iz) < 1 \\&\iff 0 < \mathop{\textup{Im}}(\pi iz) < \pi \\&\iff 0 < \arg(e^{\pi iz}) < \pi,
$$

and it follows that the transformation $z \mapsto e^{\pi iz}$ maps~$A$ bijectively onto~$B$.CMT14.7 Let $U$ be an open set in~$\mathbb{C}$. Then $U$~is conformally equivalent to an open disc if and only if $U \neq \mathbb{C}$ and $U \neq \emptyset$ and all closed paths in~$U$ are homotopic in~$U$.

A space in which all closed paths are homotopic is said to be _simply connected_.

Suppose that $U$~is conformally equivalent to an open disc.\
By Liouville's theorem, see Theorem~CMT9.2, any holomorphic function on~$\mathbb{C}$ must be constant or unbounded, so its image cannot be an open disc; therefore $U \neq \mathbb{C}$.\
It is obvious that $U \neq \emptyset$.\
It is clear that any two closed paths in a disc are homotopic; therefore the same must be true of~$U$.

The proof of sufficiency is much more difficult, and will not be covered in this course.

### Mobius transformations

CMS15

A _Mobius transformation_ is a function of the form

$$
z \mapsto \dfrac{az + b}{cz + d},
$$

where $a,b,c,d$ are complex constants such that $ad - bc \neq 0$. The condition $ad - bc \neq 0$ ensures that this function is a bijection from its domain to its image; the inverse is given by

$$
w \mapsto \dfrac{dw - b}{-cw + a}.
$$

If $c = 0$ we get a bijection from~$\mathbb{C}$ to~$\mathbb{C}$; if $c \neq 0$ we get a bijection from $\mathbb{C} \setminus \{-d/c\}$ to $\mathbb{C} \setminus \{a/c\}$; in any case we get a conformal transformation. It is convenient to regard it as a bijection from $\mathbb{C} \cup \{\infty\}$ to $\mathbb{C} \cup \{\infty\}$ by making the definitions

$$
-d/c \mapsto \infty, \quad \infty \mapsto a/c
$$

(meaning $\infty \mapsto \infty$ in the case $c = 0$). With this convention, Mobius transformations can be composed: if

$$
\theta_{1}(z) = \dfrac{a_1z + b_1}{c_1z + d_1}, \quad \theta_{2}(z) = \dfrac{a_2z + b_2}{c_2z + d_2},
$$

then

$$
\theta_{1} \theta_{2}(z) = \dfrac{a_3z + b_3}{c_3z + d_3},
$$

where

$$
\begin{bmatrix}a_{1}&b_{1} \\ c_{1}&d_{1}\end{bmatrix} \begin{bmatrix}a_{2}&b_{2} \\ c_{2}&d_{2}\end{bmatrix} = \begin{bmatrix}a_{3}&b_{3} \\ c_{3}&d_{3}\end{bmatrix}.
$$

CMP15.1 Under a Mobius transformation, the image of a set which is a circle or a straight line is again a set which is a circle or a straight line (with the convention that $\infty$~belongs to every straight line).The original set consist of the points~$z$ satisfying a condition of the form

$$
\dfrac{|z - p|}{|z - q|}= k,
$$

where $p$~and~$q$ are distinct complex numbers and where $k$~is a positive real number. More precisely, for a straight line one needs $k = 1$, and for a circle one needs $k \neq 1$. Making the substitution $z = (dw - b)/(-cw + a)$ gives a condition of the same form for~$w$. Indeed, we calculate

$$
k = \dfrac{|z - p|}{|z - q|}&= \dfrac{\big|\frac{dw - b}{-cw + a} - p\big|}{\big|\frac{dw - b}{-cw + a} - q\big|}\\&= \dfrac{|dw - b + p(cw - a)|}{|dw - b + q(cw - a)|}\\&= \dfrac{|(d + pc)w - pa - b|}{|(d + qc)w - qa - b|},
$$

and multiplying both sides with $(d + qc)/(c + pc)$ gives a relation of the required form for $w$.CMP15.2 Let $D$ be the open disc with centre~$0$ and radius~$1$, and let $f: D \to D$ be a conformal transformation such that $f(0) = 0$. Then $f(z) = \kappa z$ for some constant~$\kappa$ with $|\kappa| = 1$.Consider the function $f(z)/z$, which is holomorphic on $D \setminus \{0\}$. We have $f(z)/z \to f'(0)$ as $z \to 0$, so the singularity at~$0$ is removable (see Theorem~CMT11.5). Thus there is a holomorphic function~$g$ on~$D$ such that

$$
g(z) = \dfrac{f(z)}{z}
$$

for $z \neq 0$. We want to show that $g(z)$ is a constant with absolute value~$1$. Let us first prove that $|g(z)| = 1$ for all $z \in D$.\
For $0 < r < 1$ one can show that the maximum value of $|g(z)|$ with $|z| \leq r$ is attained at some point~$z_{0}$ with $|z_{0}| = r$, see Question 5 on Exercise Sheet 5.For $|z| \leq r$ it follows that

$$
\dfrac{|f(z)|}{|z|}= |g(z)| \leq |g(z_{0})| = \dfrac{|f(z_0)|}{|z_0|}\leq \dfrac{1}{r},
$$

using $f(z_{0}) \in D$ in the last inequality. Letting $r \to 1$ shows that $|f(z)| \leq |z|$ for $z \in D$. Applying the same argument to~$f^{-1}$ shows that $|z| \leq |f(z)|$ for all $z \in D$, hence $|g(z)| = 1$ for all $z \in D$ as claimed.\
We can now show that $g(z) = \kappa$ for some $\kappa \in \mathbb{C}$ with $|\kappa| = 1$. Decompose $g = u + iv$ into its real and imaginary parts. Then from $|u + iv| = 1$ we get $u^{2} + v^{2} = 1$ which implies

$$
u \frac{\partial u}{\partial x}+ v \frac{\partial v}{\partial x}= 0, \qquad u \frac{\partial u}{\partial y}+ v \frac{\partial v}{\partial y}= 0.
$$

Inserting the Cauchy--Riemann equations, see Theorem~CMT4.1, into the second equality gives

$$
- u \frac{\partial v}{\partial x}+ v \frac{\partial u}{\partial x}= 0.
$$

Multiplying this and the first equality by $u$ and $v$, respectively, and adding up the results shows

$$
(u^{2} + v^{2})\frac{\partial u}{\partial x}= \frac{\partial u}{\partial x}= 0, \qquad (u^{2} + v^{2})\frac{\partial v}{\partial x}= \frac{\partial v}{\partial x}= 0.
$$

It follows that

$$
\frac{\partial u}{\partial x}= 0 = \frac{\partial v}{\partial x},
$$

and similarly one shows that the partial derivatives of $u, v$ with respect to $y$ vanish. This means that $u$ and $v$ are constant, which finishes the proof.CMT15.3 Let $D$ be the open disc with centre~$0$ and radius~$1$, and let $f$ be a conformal transformation from~$D$ to~$D$. Then

$$
f(z) = \kappa\dfrac{z - a}{\bar{a} z - 1}
$$

for some constants $\kappa$~and~$a$ with $|\kappa| = 1$ and $|a| < 1$.Let $a = f^{-1}(0)$, and let

$$
h(z) = \dfrac{z - a}{\bar{a} z - 1}.
$$

Then $h$~is a conformal transformation from~$D$ to~$D$ such that $h(a) = 0$. It follows that $f \circ h^{-1}$ is a conformal transformation from~$D$ to~$D$ sending~$0$ to~$0$; therefore

$$
f\bigl(h^{-1}(w)\bigr) = \kappa w
$$

for some constant~$\kappa$ with $|\kappa| = 1$. Putting $w = h(z)$ gives the result.CME15.4 Let

$$
D = \{z \in \mathbb{C} \mid |z| < 1\}.
$$

Find the image of~$D$ under the transformation

$$
z \mapsto \dfrac{1 + z}{1 - 2z}.
$$

We can use the idea of the proof of Proposition~CMP15.1. Let

$$
w = \dfrac{1 + z}{1 - 2z};
$$

then

$$
z = \dfrac{w - 1}{2w + 1}.
$$

Let $w = u + iv$ with $u,v \in \mathbb{R}$; then

$$
|z| < 1&\iff |w - 1| < |2w + 1| \\&\iff |u + iv - 1| < |2u + 2iv + 1| \\&\iff (u - 1)^{2} + v^{2} < (2u + 1)^{2} + (2v)^{2} \\&\iff u^{2} + v^{2} - 2u + 1 < 4u^{2} + 4v^{2} + 4u + 1 \\&\iff 3u^{2} + 3v^{2} + 6u > 0 \\&\iff u^{2} + v^{2} + 2u > 0 \\&\iff (u + 1)^{2} + v^{2} > 1 \\&\iff |w + 1| > 1.
$$

The image of~$D$ therefore consists of the points outside the circle with centre~$-1$ and radius~$1$.\
To check this, note that

$$
-1 \mapsto 0, 1\mapsto -2, i \mapsto -1 + \tfrac{1}{5}(4 + 3i),
$$

so that the boundary circle of~$D$ is sent to the circle through $0,-2$ and $-\tfrac{1}{5}+ \tfrac{3}{5}i$. This is the circle with centre~$-1$ and radius~$1$. It follows that the image of~$D$ is either the region inside the image circle or the region outside the image circle. Since $0 \mapsto 1$, the image is in fact the outside.CME15.5 Let $f$ be a Mobius transformation such that

$$
f(\mathbb{R} \cup \{\infty\}) = \mathbb{R} \cup \{\infty\}.
$$

Show that

$$
f(z) = \dfrac{az + b}{cz + d}
$$

for some real constants $a,b,c,d$.We know that

$$
f(z) = \dfrac{Az + B}{Cz + D}
$$

for some complex constants $A,B,C,D$ such that $AD - BC \neq 0$.\
Suppose that $C = 0$. Then $A \neq 0$ and $D \neq 0$, so $f(z)$ is a linear polynomial, say

$$
f(z) = az + b = \dfrac{az + b}{0z + 1}
$$

with $a \neq 0$. We have $f(0) = b$ and $f(1) = a + b$. Since $f(0)$ and $f(1)$ are real, the same is true for $a$~and~$b$.\
Suppose that $C \neq 0$. Then we can write $f(z)$ in the form

$$
f(z) = \dfrac{az + b}{z + d}
$$

with $ad - b \neq 0$. We have $f^{-1}(\infty) = -d$; therefore $d \in \mathbb{R}$. We have $f(0) = b/d$, so that $b = d f(0)$; therefore $b \in \mathbb{R}$. Finally, we have $f(1) = (a + b)/(1 + d)$, so that

$$
a = (1 + d)f(1) - b;
$$

therefore $a \in \mathbb{R}$.
