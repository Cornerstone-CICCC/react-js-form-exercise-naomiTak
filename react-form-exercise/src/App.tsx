import { useState } from "react";

interface FormData {
  firstname: string
  lastname: string
  age: number
  favoriteFoods: string[]
}

const App = () => {
  /* Your states here */
  const [formData, setFormData] = useState<FormData>({
    firstname: "",
    lastname: "",
    age: 0,
    favoriteFoods: []
  })

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked
      setFormData(prevState => {
        //console.log(prevState)
        const favoriteFoods = checked ? [...prevState.favoriteFoods, value] : prevState.favoriteFoods.filter(food => food !== value)
        console.log(formData)
        return { ...prevState, favoriteFoods }
      })
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(formData)
    setIsSubmitted(true)
  }

  const handleClear = (e: React.FormEvent) => {
    e.preventDefault()
    setFormData({
      firstname: "",
      lastname: "",
      age: 0,
      favoriteFoods: []
    })
    setIsSubmitted(false)
  }

  return (
    <div>
      <h1>User Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstname">First Name:</label>
          <input type="text" id="firstname" name="firstname" value={formData.firstname} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="lastname">Last Name:</label>
          <input type="text" id="lastname" name="lastname" value={formData.lastname} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="age">Age:</label>
          <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} />
        </div>
        <div>
          <label>Favorite Foods:</label>
          <div>
            <input type="checkbox" id="chicken" name="favoriteFoods" value="Chicken" checked={formData.favoriteFoods.includes("Chicken")}
            onChange={handleChange} />
            <label htmlFor="chicken">Chicken</label>
          </div>
          <div>
            <input type="checkbox" id="beef" name="favoriteFoods" value="Beef" checked={formData.favoriteFoods.includes("Beef")}
            onChange={handleChange} />
            <label htmlFor="beef">Beef</label>
          </div>
          <div>
            <input type="checkbox" id="vegetables" name="favoriteFoods" value="Vegetables" checked={formData.favoriteFoods.includes("Vegetables")}
            onChange={handleChange} />
            <label htmlFor="vegetables">Vegetables</label>
          </div>
          <div>
            <input type="checkbox" id="dessert" name="favoriteFoods" value="Dessert" checked={formData.favoriteFoods.includes("Dessert")}
            onChange={handleChange} />
            <label htmlFor="dessert">Dessert</label>
          </div>
          <div>
            <input type="checkbox" id="pork" name="favoriteFoods" value="Pork" checked={formData.favoriteFoods.includes("Pork")}
            onChange={handleChange} />
            <label htmlFor="pork">Pork</label>
          </div>
        </div>
      </form>

      <button onClick={handleSubmit}>Display User</button>
      <button onClick={handleClear}>Clear</button>

      <div className="output">
        {/* Display the greeting here */
        isSubmitted ? (
          <p>Hello {formData.firstname} {formData.lastname}. You are {formData.age} years old and your favorite foods are: {formData.favoriteFoods.join(", ")}.</p>
        ) : (
          <p>Please submit form</p>
        )}
      </div>
    </div>
  );
};

export default App;