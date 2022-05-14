# react-email-chips

![react-email-chips](https://user-images.githubusercontent.com/841470/168422016-8959553d-39c2-4a21-82e4-469097714cb9.gif)


```JSX
<Chips 
  chips={[{email: 'ryan.park@gmail.com', valid: true}]} 
  placeholder='Please Add Recipients email address' 
  pattern={new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);} 
  save={(chips) => {console.log(chips)}} 
  title='Recipients' 
/>
```
