import data from "../data/data.json" assert {type: "json"}
let data_postal = []
const data_prov = []

const provinsi = document.querySelector("#prov")
const select = document.querySelector("#prov")
const select_kab = document.querySelector("#kab")
const kab = document.querySelector("#kab")

document.addEventListener('DOMContentLoaded', function () {
    addprov()
    setKab()
    result()
    form()
});

function setKab() {
    provinsi.addEventListener("change", function () {
        const id = provinsi.value
        const postal = data.postal[id]
        const option = document.createElement('option')
        option.innerText = "Pilih Kabupaten";
        option.setAttribute("selected",true)
        option.setAttribute("disabled",true)
        select_kab.innerText = ''
        select_kab.append(option)
        data_prov.push(postal)
        const city = [...new Set(postal.map((data) => {
            return data.city;
        }))]
        city.sort((a,b)=>{
            let fa = a.toLowerCase()
            let fb = b.toLowerCase()
    
            if (fa < fb) {
                return -1;
            }
            if (fa > fb) {
                return 1;
            }
            return 0;
        })
        city.map((data) => {
            makeOptionKab(data)
        })
    })
}

function addprov() {
    const prov = Object.entries(data.province)
     const data_baru = prov.map((data) => {
        return data[1]
    })
    data_baru.sort((a,b)=>{
        let fa = a.province_name.toLowerCase()
        let fb = b.province_name.toLowerCase()

        if (fa < fb) {
            return -1;
        }
        if (fa > fb) {
            return 1;
        }
        return 0;
    })
    data_baru.map((data)=>{
        makeOption(data)
    })
}

function makeOption(provinsi) {
    const option = document.createElement('option')
    option.innerText = provinsi.province_name;
    option.setAttribute('value', provinsi.province_code)
    select.append(option)
    return select
}

function makeOptionKab(kabupaten) {
    const option = document.createElement('option')
    option.innerText = kabupaten;
    option.setAttribute('value', kabupaten)
    select_kab.append(option)
    return select
}

function result() {
    kab.addEventListener("change", function () {
        const elemet = document.getElementsByClassName("card")
        if(elemet.length != 0){
            for(let i = 0,card ;card = elemet[i];i++)
            elemet[i].remove()
        }
        const value = kab.value;
        const result = data_prov[0].filter((data) => {
            if ( value  == data.city) return data
        })
        result.map((data) => {
            data_postal.push(data)
        })
        
        data_postal.map((data)=>{
            makeResult(data)
        })
        data_postal = []
    })


}

function makeResult(data) {
    const container = document.querySelector(".result");
    const div = document.createElement("div")
    const title = document.createElement("h3")
    const kecamanatan = document.createElement("h2")
    const p = document.createElement("p")
    title.innerText = `Desa : ${data.urban}`
    kecamanatan.innerText = `Kecamatan : ${data.sub_district}`
    p.innerText = `kode pos: ${data.postal_code}`
    div.classList.add("card")
    div.append(kecamanatan,title,p)
    container.append(div)
    return container
}

function form(){
    const cariForm = document.getElementById("form")
    cariForm.addEventListener("submit",function(e){
        e.preventDefault()
        const kode = document.getElementsByTagName("p");
        const desa = document.getElementsByTagName("h3")
        const cari = document.querySelector("#cari")    
        const filter = document.getElementsByClassName("card");
        const value = cari.value.toLowerCase();
        for (let i = 0, list,list2; list = kode[i],list2 = desa[i]; i++) {
            let text = list.innerHTML;
            let text2 = list2.innerHTML.toLowerCase()
            console.log(text2.indexOf(value));
            if (text.indexOf(value) > -1 || text2.indexOf(value) > -1) {
                filter[i].style.display = "";
            } else if (value.length == 0) {

            } else
                filter[i].style.display = "none";
        }

    })
    
}
