import { createStore } from "redux";
import profileReducer from "./profileReducer";
import { addProfile, removeProfile, calculateAverageAge } from "./actions";

const store = createStore(profileReducer)

store.subscribe(() => {
    renderProfiles()
    updateAverageAge()

})

const profileList = document.querySelector("#profileList")
const averageAge = document.querySelector("#averageAge")

const profiles = [  
    { id: 1, name: "Alice", age: 25 },  
    { id: 2, name: "Bob", age: 30 },  
    { id: 3, name: "Charlie", age: 35 }
]


// profiles.forEach(profile => {
//     store.dispatch(addProfile(profile));
// });
//store.dispatch(calculateAverageAge());


const renderProfiles = () => {
    const state = store.getState();
  const renderedProfiles = state.profiles.map((profile) => `
  <div>
  <li>${profile.id}.${profile.name}(${profile.age} years old)</li>
  </div>
  `).join("")
  profileList.innerHTML = renderedProfiles
}

const updateAverageAge = () => {
    const state = store.getState()

    averageAge.innerHTML = `Average Age: ${state.avgAge}`
}
const addProfileForm = document.querySelector("#addProfileForm")

addProfileForm.addEventListener("submit", (event) => {
    event.preventDefault()

    const id = parseInt(document.querySelector("#id").value)
    const name = document.querySelector("#name").value
    const age = parseInt(document.querySelector("#age").value)

    const newProfile = {id, name, age}

    store.dispatch(addProfile(newProfile))
    store.dispatch(calculateAverageAge())

})

window.removeProfileHandler = () => {
    const profileId = parseInt(document.querySelector("#removeProfileId").value)

    store.dispatch(removeProfile(profileId))
    store.dispatch(calculateAverageAge())

}

renderProfiles()
updateAverageAge()