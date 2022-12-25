console.log('hello');

var showMore = false

$(".showMoreBtn").click(function () {
    if (!showMore) {
        $('.bottom').css('top', '0px')
        $('.showMoreBtn').css("background-image", "url(./images/show_more_up.png)");
        showMore = true
    } else {
        $('.bottom').css('top', '-557px')
        $('.showMoreBtn').css("background-image", "url(./images/show_more.png)");
        showMore = false
    }
});
