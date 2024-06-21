window.onload = function(){
    poll_update()
}


const v = document.querySelectorAll('.poll-btn')
let pollData = localStorage.getItem('Polls') || '{}'
    pollData = JSON.parse(pollData)
function poll(item){
    if(!!pollData[item])
        pollData[item] = pollData[item] + 1;
    else
        pollData[item] = 1;

    update_poll_data()
}
function update_poll_data(){
    localStorage.setItem('Polls', JSON.stringify(pollData))
    poll_update()
}

v.forEach(el=>{
    el.addEventListener('click', function(e){
        e.preventDefault()
        var item = el.dataset.item || null
        if(item != null)
            poll(item)
    })
})

function poll_update(){
    var total = 0;
    var items = [];
    Object.entries(pollData).map(item=>{
        items.push(item[0])
        total += parseInt(item[1])
    })
    
    items.forEach(item => {
     
        if(document.querySelectorAll(`.poll-container[data-item="${item}"]`) == null)
            return;
        var container = document.querySelector(`.poll-container[data-item="${item}"]`)

        var percentage = pollData[item] || 0
            percentage = percentage > 0 ? ((percentage / total) * 100) : 0;
            percentage = percentage.toLocaleString('en-US', {style: 'decimal', maximumFractionDigits:2})

        if(container.querySelector('.poll-percentage') != null)
            container.querySelector('.poll-percentage').innerText = `${percentage}%`

        if(container.querySelector('.poll-progress') != null)
            container.querySelector('.poll-progress').setAttribute('aria-valuenow', percentage)
        
        if(container.querySelector('.poll-progress .progress-bar') != null)
            container.querySelector('.poll-progress .progress-bar').style.width = `${percentage}%`
    })
}

