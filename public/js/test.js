document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.tooltipped');
    var instances = M.Tooltip.init(elems);
    elems = document.querySelectorAll('select');
    instances = M.FormSelect.init(elems);
});

const st_info_icon = document.getElementById('info-icon-st')

st_info_icon.addEventListener('click', function () {
    var elems = document.querySelector('#modal-info-st');
    var instances = M.Modal.init(elems);
    M.Modal.getInstance(elems).open()
});

const ecd_info_icon = document.getElementById('info-icon-ecd')

ecd_info_icon.addEventListener('click', function () {
    var elems = document.querySelector('#modal-info-ecd');
    var instances = M.Modal.init(elems);
    M.Modal.getInstance(elems).open()
});

const oldPeakInput = document.getElementById('oldpeak')

oldPeakInput.addEventListener('invalid', function(ev){
    this.setCustomValidity('Please enter value with floating point (e.g. 2.0)');
})