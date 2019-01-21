module.exports = {
  name: 'Deploying a Next.js App',
  intro: `
Have you ever come across the question:

> How can I deploy my Next.js app?

We haven't talked about that yet, but it's pretty simple and straightforward.

You can deploy a Next.js app to anywhere you can run Node.js. So, there's not any kind of lock-in, even though deploying with [▲ZEIT Now](https://zeit.co/now) is super simple.

Let's learn about deploying Next.js apps.
  `,
  steps: [
    {
      id: 'setup',
      type: 'text',
      points: 5,
      text: `
First of all, we need a simple Next.js app to play with. Try to download the following example app:

~~~bash
git clone https://github.com/arunoda/learnnextjs-demo.git
cd learnnextjs-demo
git checkout using-shared-components
~~~

You can run it with:

~~~bash
npm install
npm run dev
~~~

Now you can access the app by navigating to http://localhost:3000.
      `
    },
    {
      id: 'build-and-start',
      type: 'text',
      points: 10,
      text: `
## Build and Start

First of all, we need to build our Next.js app for production. It will produce an optimized set of code for production.

For that, simply add the following npm script:

~~~json
"scripts": {
  "build": "next build"
}
~~~

Then you need to start your Next.js app on a port. That will do server side rendering and serve pages (built with the above command).

For that, add the following npm script:

~~~json
"scripts": {
  "start": "next start"
}
~~~

That will start our app in port 3000.

So, you can run the following commands to run our app in production:

~~~bash
npm run build
npm run start
~~~
      `
    },

    {
      id: 'run-two-instances',
      type: 'mcq',
      points: 25,
      answers: [
        'Yes, both http://localhost:8000 and http://localhost:9000',
        'Only http://localhost:8000',
        'Only http://localhost:9000',
        'Neither one'
      ],
      correctAnswer: 'Yes, both http://localhost:8000 and http://localhost:9000',
      text: `
## Run two instances

Now we are going to run two instances of our app. Usually, we do this to horizontally scale our app.
First of all, make the following changes to our start npm script:

~~~json
"scripts": {
  "start": "next start -p $PORT"
}
~~~

> If you are on Windows, your start script should be \`next start -p %PORT%\`.

Now let's build our app first.

~~~bash
npm run build
~~~

Then try to run the following commands in its own terminal:

~~~
PORT=8000 npm start
PORT=9000 npm start
~~~

> On Windows, you will need to run the command differently. One option is to install the npm module [\`cross-env\`](https://www.npmjs.com/package/cross-env) into your app.
Then run \`cross-env PORT=9000 npm start\` from the command line.

Is it possible to access our app on both ports?
      `
    },

    {
      id: 'build-once-run-many-instances',
      type: 'text',
      points: 5,
      text: `
## Build Once, Run Many Instances

As you can see, you need to only build your app once. Then you can start it on as many ports as you wish.
      `
    },

    {
      id: 'deploying-to-zeit-now',
      type: 'mcq',
      points: 30,
      answers: [
        '8000',
        '443 (or without a port mentioned)',
        'Any port you mentioned in the URL',
        'It will throw an error saying, \'You can only start your app on port 443\''
      ],
      correctAnswer: '443 (or without a port mentioned)',
      text: `
## Deploying to ▲ZEIT Now

Now we know how to build and start a Next.js app. We did everything with npm scripts. So, you will be able to customize it to work with your favorite deployment service.

Using [▲ZEIT Now](https://zeit.co/now), add the following scripts to the package.json file:

~~~json
"scripts": {
  "build": "next build",
  "start": "next start -p 8000"
}
~~~

Then, create a now.json file in the root of your project with the following contents:

~~~json
{
  "version": 2,
  "builds": [
    { "src": "package.json", "use": "@now/next" }
  ]
}
~~~

Finally, [install Now](https://zeit.co/now) and run the following command:

~~~
now
~~~

> Basically, you run the “now” command from your terminal inside your app's root directory.

Here, we mentioned port 8000 as the port in which we start our app. But we didn't change it when deploying to ZEIT Now.

So, in which port could we access our app when deployed to ZEIT Now?
      `
    },

    {
      id: 'zeit-now-port-443',
      type: 'text',
      points: 5,
      text: `
## ZEIT Now will always use 443

Even if you start your app on port 8000, once deployed to now, you can access it with port 443 (the default port for "https" websites).

That's a feature of ▲ZEIT Now. You only need to start your app on any port you like elsewhere. ▲ZEIT Now will map it to port 443 always.

> Learn more about the Next builder @now/next at [the ZEIT documentation](https://zeit.co/docs/v2/deployments/official-builders/next-js-now-next).
      `
    },

    {
      id: 'build-your-app-locally',
      type: 'text',
      points: 10,
      text: `
## Build Your App Locally

▲ZEIT Now will build your app inside it's build infrastructure.

But, not every hosting provider will have something like that.
In that case, you can build your app locally with:

~~~bash
npm run build
~~~

Then deploy the app with the \`.next\` directory.
      `
    },

    {
      id: 'finally',
      type: 'text',
      points: 5,
      text: `
## Finally

Now you know how to deploy a Next.js app with [ZEIT Now](https://zeit.co/now).

You can also learn more about [deploying Next.js](https://nextjs.org/docs#production-deployment) from our docs.

If you have any questions regarding deployments, feel free to ping us on [Spectrum](https://zeit.chat/).
      `
    }
  ]
}
