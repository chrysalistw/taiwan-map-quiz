import "/d3/d3.min.js"

function start(){
	console.log("start!")
	fetch("tpc.svg")
		.then(res=>res.text())
		.then(text=>{
			document.querySelector("div").innerHTML = text
		})
		.then(()=>{
			d3.selectAll("path")
				.attr("fill", fill)
				.attr("stroke", stroke)
				.attr("stroke-width", "0.1")
			addFeatures()
		})
}
start()
var fill = "#CCC"
var stroke = "black"
var question = {
	q: "",
	a: "",
	queue: undefined,
	num: 0,
	setQueue: function(){
			function shuffle(a){
				for(let i=a.length-1; i>0; i--){
					let rand = Math.floor(i*Math.random())
					let t = a[i]
					a[i] = a[rand]
					a[rand] = t
				}
				return a
			}
			if(!question.queue){
				let names = Array(...document.getElementsByTagName("path")).map(e=>e.id)
				question.queue = shuffle(names)
			}
	},
	questioner: function(){
		console.log(this.num, this.queue.length)
		if(this.num >= this.queue.length){
				over()
				return
		}
		this.q = this.queue[this.num]
		console.log(this.q, question.q)
		d3.select("div#div").text(question.q)
	},
	check: function(){
		if(this.q===this.a){
			rightColor(this.q)
			this.num += 1
			return true
		}
		return false
	}
}
function over(){
	d3.select("div#div").text("結束")
	d3.select("div#div").append("div").attr("id", "restart")
		.text("\u00A0↺\u00A0")
		.style("text-align", "center")
		.style("width", "35px").style("height", "35px")
		.style("font-size", "30px")
		.style("line-height", "35px")
		.style("display", "inline")
		.style("border", "2px solid black")
		.style("border-radius", "25px")
		.style("background", "red")
		.on("click", e=>{
			start()
		})
}
function addFeatures(){
	addClick()
	addZoom()
	d3.select("div#div").remove()
	addButtons()
	question.q = ""
	question.a = ""
	question.num = 0
	question.queue = undefined
	question.setQueue()
	question.questioner()
	console.log(question)
}
function rightColor(id){
	d3.select("#"+id).attr("fill", "orange").attr("class", "pass")
}
function addClick(){
	d3.selectAll("path")
		.on("mouseover", e=>{
			if(e.target.getAttribute("class")=="pass") return
			d3.select(e.target).attr("fill", "red")
		})
		.on("mouseout", e=>{
			if(e.target.getAttribute("class")=="pass") return 
			e.target.setAttribute("fill", fill)
		})
		.on("click", e=>{
			if(e.target.getAttribute("class")=="pass") return 
			question.a = e.target.id
			if(question.check()){
				question.questioner()
			}
			else
				e.target.setAttribute("fill", "violet")
		})
}
function addZoom(){
	let k = 0.8
	let x = 250//200
	let y = 100//130
	d3.select("g").attr(
		"transform",
		d3.zoomIdentity
		.scale(k).translate(x,y)
	)
	d3.select("svg").call(
		d3.zoom()
		.on("zoom", e=>{
			d3.select("g").attr(
				"transform",
				e.transform
				.scale(k).translate(x,y)
			)
		})
	)
}
function addButtons(){
	d3.select("body").append("div")
		.attr("id", "div")
		.style("text-align", "center")
		.style("font-size", "50px")
		.style("position", "fixed")
		.style("display", "block")
		.style("border", "2px solid #0FC")
		.style("border-radius", "25px")
		.style("background", "#0FC")
		.style("min-width", "250px")
		.style("max-width", "500px")
		.style("max-height", "70px")
		.style("width", "250px").style("height", "70px")
		.style("left", "8vh")
		.style("top", "15%")
		.style("line-height", "70px")
}