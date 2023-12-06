const getLifts = async () => {
    const url = "https://colinelmore.github.io/242%20CSCE/projects%20-%20242/part4/json/core.json";

    try {
      const response = await fetch(url);
      return await response.json();
    } catch (error) {
      console.log(error);
    }
  };

const showLifts = async() => {
    let lifts = await getLifts();
    let liftsSection = document.getElementById("lift-section");
    lifts.forEach((lift) => liftsSection.append(getLiftItem(lift)));
};

const getLiftItem = (lift) => {
    const liftSection = document.createElement("section");
    liftSection.classList.add("lift");
    liftSection.classList.add(lift.category);

    console.log(lift);
  
    const img = document.createElement("img");
    img.src = "https://github.com/colinelmore/final/tree/main/public/pictures/" + lift.img;
    const h5 = document.createElement("h5");
    h5.innerText = lift.name;

    const p = document.createElement("p")
    p.innerText = lift.description;

    liftSection.append(img);
    liftSection.append(h5);
    liftSection.append(p);
    return liftSection;
  };


showLifts();



