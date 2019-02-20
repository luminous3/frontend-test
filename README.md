# Superformula Front-end Developer Coding Test


## Demo

### Screenshots

#### Main Page
![](https://i.ibb.co/XzzXMsy/Screen-Shot-2019-02-19-at-5-50-01-PM.png)
#### Drop Down No Hover
![](https://i.ibb.co/j3Rqdb4/Screen-Shot-2019-02-19-at-5-50-31-PM.png)
#### Drop Down Hover Non-selected
![](https://i.ibb.co/2qwCNjt/Screen-Shot-2019-02-19-at-6-14-09-PM.png)
#### Drop Down Hover selected
![](https://i.ibb.co/C9cRVYD/Screen-Shot-2019-02-19-at-6-14-16-PM.png)
#### Loading Animation
![](https://media.giphy.com/media/6AbgFJOEdkRKtkzs6h/giphy.gif)
#### Filled Button (Empties on Hover)
![](https://media.giphy.com/media/QKBkso6gkSadpUT6bJ/giphy.gif)
#### Empty Button (Fills on Hover)
![](https://media.giphy.com/media/bbJraWrZ4fHQrW1CZx/giphy.gif)
#### Detail View
![](https://i.ibb.co/6WY2qFh/Screen-Shot-2019-02-19-at-6-46-55-PM.png)

### Video
[Here is a link to a video exploring the site](https://streamable.com/s/341d1/haserc)


## Notable Items

#### withContextState
I didn't want to use redux because it would have been overkill for an application like this. Beyond that, I always like to experiment a little in these coding challenges and I've been wanted to play more with reacts new context API. So I created a simple data management solution around React context that's inspired by redux. The idea is that it will give you access to getters and setters for a global store without having to do the boiler plate that comes with more complex options.

To start you create a store at the root of your application passing in any default you wish:
```js
import { withStateContext } from 'contextState'

@withStateContext({
  thisIsAnExampleOfDefaultData: true
})
class App extends Component {
  ...
}
```

Then at any point in the application you can connect to that global state:
```js
import { connectState } from 'contextState'

@connectState()
class Example extends Component {
  ...
}
```

This will give you the `setContextState` function. This is going to be the setter for your data:

```js
setContextState({ businesses: {...} })
```

The `connectState` also takes an argument that lets you select the data you would like from the store and will pass it down as a prop under of the same name:
```js
import { connectState } from 'contextState'

@connectState('businesses')
class Example extends Component {
  ...
  render() {
    this.props.businesses
    ...
  }
}
```
If the data is stored multiple levels deep or you would like to rename the prop you can pass in a getter as the second argument. It receives state and props and resolves to the object you are looking for:
```js
import { connectState } from 'contextState'

@connectState(
  'business',
  (state, props) => get(state, `businesses.${props.id}`)
)
class Example extends Component {
  ...
  render() {
    this.props.business
    ...
  }
}
```
#### withLoading
A decorator that takes in a loading component and if the prop `loading: true` is passed into the component it will render the loading component instead.
```js
import withLoading from 'decorators/withLoading';
import LoadingComponent from './Example.loading.js'

@withLoading(LoadingComponent)
class Example extends Component {
  ...
}

<Example loading /> // Will render LoadingComponent
<Example loading={false} /> // Will render Example
```

With this I was able to implement some nice loading animations.

#### Folder Structure

There are 4 main section of my file structure:

* **components** - The general component library. There are specific component sections that we will talk about later but this folder has components that will be used across the application.
* **decorators** - general HOCs to enhance the functionality of components
* **modules** - interaction with external apis
* **routes** - Main code for the application

I chose to use a recursive pod structure inside the routes folder. Every level will have the same files:  

```

routes
 |-> Comp1/
 |    |-> components/
 |    |    |-> ChildComp/
 |    |    |    |-> components/ ...
 |    |    |    |-> index.js
 |    |    |    |-> childComp.css
 |    |->index.js
 |    |->comp1.css
 |    |->comp1.test.js // When tests are added
 |    |->comp1.loader.js // see withLoader below
```
I find this structure easier as the application grows because you are able to easily access everything you need without having to jump all over the code base.

#### CSS modules

I opted for css modules and native css variables to reduce naming conflict and keep all css living in the pod structure.

#### CSS grids

For the main list grid I used css grid to make that layout simpler. This will be very help for future extensions into the mobile layout because css grids all for huge layout shifts on different screen sizes.

## Future Extensions

### Testing

There are no tests and I would like to add a testing framework for unit tests. Especially for the global components in the top level `components` directory. I really enjoy Jest and would opt for that as the my test runner.

### Optimization

Currently I used Pure and Functional components as much as possible but added memoization onto selectors is always a great way to make sure future developers are accessing data correctly. In my experience accessing data is the biggest hole for performance leaks to creep in.  

### Storybook

I would love to add storybook to this to have documentation growing with the application. Especially early on it's very nice to get that in so we are not trying to play catch-up later on and potentially duplicating engineering efforts because of lack of transparency.

### Split Repo

I would pull out the entire component folder into it's own repo and publish it under an npm package. In doing that we can develop it independent of the application itself, use it across project for consistency, and have greater control over component versioning.

### State Management

I would either need to continue to formalize the state context concept or switch over to a more structure data management layer if we were going to continue to grow this application.  

### Mobile Support

I made the website responsive to different web screens but didn't implement the mobile layout. If I had more time I would have leveraged css grid and created a breakpoint as part of the base design system in order to develop the mobile designs.

### Proptypes

I want to add in prop typing for all the components to add a layer of protection and self documentation.  

### Loading Animation Development

I added a loading animation for the main page as an example but I would love to continue to build out loading animations for a lot more components. This will make the page feel a lot more complete and lower the perceived time to first interaction.
