$.getJSON('https://js.adapools.org/pools/2dd26a3b9dd2372c8c483c730d2a47a6f51e51c06b4a9c248f6dd3ac/summary.json', function(data) {
	$.each( data.data, function( i, val ) {
		a = new Array('tax_fix','pledge','total_stake', 'active_stake');
		if (a.includes(i)) val = Math.round(parseInt(val) / 1000000);
		if (i == 'blocks_lifetime') val = parseInt(val) + parseInt(data.data.blocks_epoch);

		let _newval = 0;
		switch (i) {
			case "pledge":
			case "total_stake":
			case "active_stake":
				if (parseFloat(val) >= 1000) {
					_newval = parseInt(val) / 1000;
					_newval = Math.round((_newval + Number.EPSILON) * 100) / 100;
				}
				else {
					_newval = val;
				}
				$('#2dd26a3b9dd2372c8c483c730d2a47a6f51e51c06b4a9c248f6dd3ac_'+i).html(_newval + "k").text();
				break;
			case "tax_ratio":
			case "roa":
				_newval = parseFloat(val) * 100;
				$('#2dd26a3b9dd2372c8c483c730d2a47a6f51e51c06b4a9c248f6dd3ac_'+i).html(_newval + "%").text();
				break;
			default:
				val = val ? val : 0;
				$('#2dd26a3b9dd2372c8c483c730d2a47a6f51e51c06b4a9c248f6dd3ac_'+i).html(val).text();
		}
	}); 
});
$.getJSON('https://api.coingecko.com/api/v3/simple/price?ids=cardano&vs_currencies=USD', function(data) {
	$('#ada-price').html('$ ' + data.cardano.usd);
});

var systemStart = moment("2017-09-23T21:44:51Z"); //genesis start time from genesis.json
var epochLength = 432000; //number of slots in an epoch from genesis.json
var slotLength = 1; //slot length in seconds from genesis.json (is not needed right now because it is 1 second)

var now = moment(); //current time
var seconds_since_start = now.diff(systemStart, "seconds"); //the amout of seconds since between the current time and system start
var current_epoch = parseInt(seconds_since_start / (epochLength * slotLength)); //the current epoch

$("#epoch").html(current_epoch);

/*var seconds_from_start_to_next_epoch = (current_epoch + 1) * (epochLength * slotLength);
var next_epoch = systemStart
  .clone()
  .add(seconds_from_start_to_next_epoch, "seconds");
var seconds_between_now_and_next_epoch_start = next_epoch.diff(now, "seconds");
var duration = moment.duration(
  seconds_between_now_and_next_epoch_start,
  "seconds"
);

var x = setInterval(function () {
  duration.add(-1, "second");

  if (duration <= 0) {
    current_epoch += 1;
    seconds_from_start_to_next_epoch = (current_epoch + 1) * (epochLength * slotLength);
    next_epoch = systemStart
      .clone()
      .add(seconds_from_start_to_next_epoch, "seconds");
    seconds_between_now_and_next_epoch_start = next_epoch.diff(now, "seconds");
    duration = moment.duration(
      seconds_between_now_and_next_epoch_start,
      "seconds"
    );
  }
  console.log(duration);
  document.getElementById("currentepoch").innerHTML =
    "Current Epoch: " + current_epoch;
  document.getElementById("countdown").innerHTML =
    "Next Epoch in: " +
    duration.days() +
    "d " +
    duration.hours() +
    "h " +
    duration.minutes() +
    "m " +
    duration.seconds() +
    "s";
  document.getElementById("date").innerHTML =
    "Next Epoch Start: " + next_epoch.format("ddd DD MMM YYYY HH:MMa");
}, 1000);*/