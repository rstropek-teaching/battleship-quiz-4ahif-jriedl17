

$(() => {
  // Select table containing the battleground
  const battleground = $('#battleground');

  // Build 10 x 10 grid for battleground
  for (let row = 0; row < 10; row++) {
    // Create table row
    const tr = $('<tr>');
    for (let column = 0; column < 10; column++) {
      // Create table cell with CSS class `water`. Note that we use
      // HTML data attributes  to store the coordinates of each cell
      // (see https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes). 
      // That makes it much easier to find cells based on coordinates later.
      $('<td>').addClass('water').attr('data-r', row).attr('data-c', column).appendTo(tr);
    }

    // Add table row to battleground table
    tr.appendTo(battleground);
  }

  $('#generate').click(() => {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        $('td[data-r="' + i + '"][data-c="' + j + '"]').removeClass('ship').addClass('water');
      }
    }
    //List of the ships
    const ships = [5];

    //different types of the ships
    const carrier = {};
    const battleship = {};
    const cruiser = {};
    const submarine = {};
    const destroyer = {};

    //length of the ships
    carrier.shipLength = 5;
    battleship.shipLength = 4;
    cruiser.shipLength = 3;
    submarine.shipLength = 3;
    destroyer.shipLength = 2;

    //add ships to Array
    ships[0] = carrier;
    ships[1] = battleship;
    ships[2] = cruiser;
    ships[3] = submarine;
    ships[4] = destroyer;

    for (let i = 0; i < ships.length; i++) {
      calculateShip(ships[i]);
    }

  });
});

function calculateShip(ship) {

  const direction = Math.floor(Math.random() * (1 - 0 + 1) + 0);                                                                    //0: horizontal, 1: vertical
  //alert(direction);

  if (direction == 0) {
    var placed = false;
    var boolSet = false;
    while (!placed) {
      var k = 0;                                                                                                                    //counter for length of ship

      const iRandom = Math.floor(Math.random() * (9 - 0 + 1) + 0);
      const jRandom = Math.floor(Math.random() * (9 - 0 + 1) + 0);

      if ((jRandom + ship.shipLength) < 10) {
        while (k < ship.shipLength) {
          boolSet = setable(iRandom, jRandom);
          if(!boolSet){
            break;
          }
          k++;
        }
        if (boolSet) {
          for (let j = jRandom; j < ship.shipLength + jRandom; j++) {
            // alert("zeichnen");
            $('td[data-r="' + iRandom + '"][data-c="' + j + '"]').removeClass('water').addClass('ship');
          }
          placed = true;
        }
      }
    }
  } else if (direction == 1) {
    var placed = false;
    var boolSet = false;
    while (!placed) {
      var k = 0;                                                                                                                    //counter for length of ship

      const iRandom = Math.floor(Math.random() * (9 - 0 + 1) + 0);
      const jRandom = Math.floor(Math.random() * (9 - 0 + 1) + 0);

      if ((iRandom + ship.shipLength) < 10) {
        while (k < ship.shipLength) {
          boolSet = setable(iRandom, jRandom);
          if(!boolSet){
            break;
          }
          k++;
        }
        if (boolSet) {
          for (let i = iRandom; i < ship.shipLength + iRandom; i++) {
            //alert("zeichnen");
            $('td[data-r="' + i + '"][data-c="' + jRandom + '"]').removeClass('water').addClass('ship');
          }
          placed = true;
        }
      }
    }
  }
}

function setable(i, j) {

  if(!($('td[data-r="' + i + '"][data-c="' + j + '"]').hasClass('ship'))
    && !($('td[data-r="' + (i - 1) + '"][data-c="' + j + '"]').hasClass('ship'))
    && !($('td[data-r="' + (i - 1) + '"][data-c="' + (j - 1) + '"]').hasClass('ship'))
    && !($('td[data-r="' + i + '"][data-c="' + (j - 1) + '"]').hasClass('ship'))
    && !($('td[data-r="' + (i + 1) + '"][data-c="' + (j - 1) + '"]').hasClass('ship'))
    && !($('td[data-r="' + (i + 1) + '"][data-c="' + j + '"]').hasClass('ship'))
    && !($('td[data-r="' + (i + 1) + '"][data-c="' + (j + 1) + '"]').hasClass('ship'))
    && !($('td[data-r="' + i + '"][data-c="' + (j + 1) + '"]').hasClass('ship'))
    && !($('td[data-r="' + (i - 1) + '"][data-c="' + (j + 1) + '"]').hasClass('ship'))){
    return true;
  }

  return false;
}
