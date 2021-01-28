async function startGame(filename, viewBox){
	await fetchSVG(filename)
	addFeatures()
	addZoom(viewBox)
}
function restart(){
	d3.selectAll("path").attr("class", "")
	addFeatures()
}
function fetchSVG(filename){
	return new Promise(resolve=>{
		fetch(filename)
			.then(res=>res.text())
			.then(text=>{
				document.querySelector("#map").innerHTML = text
				resolve()
			})
	})
}
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
		if(this.num >= this.queue.length){
				over()
				return
		}
		this.q = this.queue[this.num]
		d3.select("#problem").text(question.q)
		console.log(d3.select("#problem"))
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
	d3.select("#problem").text("結束")
	d3.select("#problem").append("div").attr("id", "restart")
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
			restart()
		})
	d3.select("#text").remove()
}
function addFeatures(){
	addClick()
	d3.select("div#container").remove()
	addButtons()
	question.q = ""
	question.a = ""
	question.num = 0
	question.queue = undefined
	question.setQueue()
	question.questioner()
}
function rightColor(id){
	d3.select("#"+id).attr("class", "right")
}
function addClick(){
	d3.selectAll("path")
		.on("mouseover", function(e){
			if(d3.select(this).attr("class")=="right") return
			d3.select(this).attr("class", "select")
		})
		.on("mouseout", function(e){
			if(d3.select(this).attr("class")=="right") return
			d3.select(this).attr("class", "")
		})
		.on("click", function(e){
			if(d3.select(this).attr("class")=="right") return
			question.a = e.target.id
			if(question.check()){
				question.questioner()
			}
			else
				d3.select(this).attr("class", "wrong")
		})
}
function addZoom(vb){
	d3.select("svg")
	.attr("viewBox", vb)
	.call(
		d3.zoom()
		.on("zoom", e=>{
			d3.select("g").attr(
				"transform", e.transform
			)
		})
	)
}
function addButtons(){
	d3.select("body").append("div")
		.attr("id", "container")
		.style("position", "fixed")
		.style("display", "block")
		.style("border", "2px solid #0FC")
		.style("border-radius", "25px")
		.style("background", "#0FC")
		.style("width", "250px").style("height", "70px")
		.style("left", "50%")
		.style("top", "50px")
		.style("transform", "translate(-50%, 0)")
	d3.select("#container").append("div")
		.attr("id", "problem")
		.style("text-align", "center")
		.style("font-size", "50px")
		.style("line-height", "70px")
	d3.select("#container").append("div")
		.attr("id", "text")
		.text("請找出：")
		.style("font-size", "20px")
		.style("position", "absolute")
		.style("top", "-30px")
}
