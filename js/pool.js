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
        let num_format = "";
				if (parseFloat(val) >= 999 && parseFloat(val) < 1000000) {
					_newval = parseInt(val) / 1000;
					_newval = Math.round((_newval + Number.EPSILON) * 100) / 100;
          num_format = "k";
				}
        else if (parseFloat(val) > 1000000) {
          _newval = parseInt(val) / 1000000;
          _newval = Math.round((_newval + Number.EPSILON) * 100) / 100;
          num_format = "<small>M</small>";
        }
				else {
					_newval = val;
				}
				$('#2dd26a3b9dd2372c8c483c730d2a47a6f51e51c06b4a9c248f6dd3ac_'+i).html(_newval + num_format).text();
				break;
			case "tax_ratio":
				_newval = parseFloat(val) * 100;
				$('#2dd26a3b9dd2372c8c483c730d2a47a6f51e51c06b4a9c248f6dd3ac_'+i).html(_newval + "%").text();
				break;
      case "roa":
        _newval = parseFloat(val);
        _newval = Math.round((_newval + Number.EPSILON) * 100) / 100;
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