# Vershio
[![Vershio Page](https://res.cloudinary.com/devpost/image/fetch/s--MPCMG1oA--/c_limit,f_auto,fl_lossy,q_auto:eco,w_900/http://u.filein.io/URH9q5DsSC.png)][https://youtu.be/sR23-Sf2pS0]

## 💡 Inspiration

We wanted to make something that would help students out.  As students, we know the importance of having access to knowledge in an easy to understand words and phrases. So we designed something that will give students everywhere access to this information, add to our index, and share knowledge.

## 💻 What it does


- Take a picture or upload a video copyright-free using our web app. 
- Our state-of-the-art machine learning platform allows us to extract only what's truly important.
- It provides summaries so that students get free information in less time than it takes to.
- It makes the info available for searching and viewing, there for all the world to see!

## 🔨 How we built it

Planning: Finding an idea, divvying up tasks, and seeing if we’re crazy enough to make an attempt. It took a lot of time here because there were so many random ideas we could have come up with. LoFi Designs: Creating low fidelity versions of our product, figuring out how we can apply machine learning. We also were able to link a lot of our code with the Figma component designs, which was new to us but very cool! HiFi Designs: Constructing detailed plans for how it’s going to work. We used Glassmorphism and pastel colors and were initially hesitant because it could have been hard to integrate in code, but it turned out great since Figma provided great CSS code. Development: Developing the product based on our designs. Not to brag, but we wrote so much code and they really do work well!

Here are some of our figma designs:
![Figma Designs](https://res.cloudinary.com/devpost/image/fetch/s--QhAul_x4--/c_limit,f_auto,fl_lossy,q_auto:eco,w_900/http://u.filein.io/_c9po7w_vC.png)

## 🧠 Challenges we ran into
Google Cloud Platform integration with Flask destroyed us as we were continuously waiting for deployments and the platform was having a trouble adjusting to our NLP models

One route we explored was to pretrain tesseract. This may seem like a fairly simple process but in fact it is a gruesome strenuous activities that requires hours of work placed into bounding box drawings. In the end we decided not to pursue this because it obviously was just a waste of time. Creating artificial intelligence models from scratch is a tedious and difficult task especially to complete in 24 hours. Luckily, we were able to remove the idea of creating custom models and used pre-trained ones instead.

Using flask was fairly new to both Ahmed and I, and a lot of the times we found ourselves looking back at silly mistakes that could have been avoided easily with a little experience.

## 🏅 Accomplishments that we're proud of

Completing an aesthetically pleasing and functioning website despite time constraints, coding hiccups, and team member time differences. We tried out a completely new form of design -> using glassmorphism instead of the minimalist designs we were used to.

## 📖 What we learned

We learned a lot about how to use GPT-3 as well as what can or cannot be done. Hint: a lot can be done. Surprisingly, we also learned to train a model on handwriting as well as how to use OCR, and extract text from videos to allow people to upload them. Finally, we used Firebase and learned a lot about Google Cloud Functions and how to integrate such large backend into our website.

## 🔜 What's next for _Vershio_

Community Feature. We'd like to use Discourse forum boards to enable people to discuss features as well as talk about materials that can be found on the website! We also hope to launch an actual beta version so more people can actually use this! We foresee a lot of potential for this. IOS & Android App Version

