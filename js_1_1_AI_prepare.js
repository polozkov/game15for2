AI = {
  arr_neighbours: [[1, 3], [0, 2, 4], [1, 5], [0, 4, 6], [1, 3, 5, 7], [2, 4, 8], [3, 7], [4, 6, 8], [5, 7]],
  arr_8_rot: [
    [0, 1, 2, 3, 4, 5, 6, 7, 8], [6, 3, 0, 7, 4, 1, 8, 5, 2], [8, 7, 6, 5, 4, 3, 2, 1, 0], [2, 5, 8, 1, 4, 7, 0, 3, 6],
    [2, 1, 0, 5, 4, 3, 8, 7, 6], [0, 3, 6, 1, 4, 7, 2, 5, 8], [6, 7, 8, 3, 4, 5, 0, 1, 2], [8, 5, 2, 7, 4, 1, 6, 3, 0]
  ],

  f_arr_generate: function (len, f) {
    var arr_result = [];
    for (var i = 0; i < len; i += 1)
      arr_result.push(f(i));
    return arr_result;
  },
  
  F_POSIT: function (arr_posit = [0, 0, 0, 0, 0, 0, 0, 0, 0], who = 1, n_moves_done = 0) {
    this.posit = arr_posit.slice();
    this.who = who;
    this.n_moves_done = n_moves_done;
  }
};

AI.F_POSIT.prototype.f_copy = function () { return new AI.F_POSIT(this.posit, this.who, this.n_moves_done); };

AI.F_POSIT.prototype.f_move_do_copy = function (move_na_nb) {
  var new_obj = this.f_copy();
  new_obj.posit[move_na_nb[0]] = 0;
  new_obj.posit[move_na_nb[1]] = this.who;
  new_obj.who *= -1;
  new_obj.n_moves_done += 1;
  return new_obj;
};

AI.F_POSIT.prototype.f_get_empty = function () {
  for (var i = 0; i < this.posit.length; i += 1)
    if (this.posit[i] === 0)
      return i;
  debugger;
};

AI.F_POSIT.prototype.f_generate_moves = function () {
  var arr_result = [];
  if (this.n_moves_done < 8) {
    for (var i = 0; i < this.posit.length; i += 1)
      if (this.posit[i] === 0)
        arr_result.push([i, i]);
  } else {
    var n_empty = this.f_get_empty();
    var contacts = AI.arr_neighbours[n_empty];
    for (var j = 0; j < contacts.length; j += 1)
      if (this.posit[contacts[j]] === this.who)
        arr_result.push([contacts[j], n_empty]);
  }
  return arr_result;
};

AI.F_POSIT.prototype.f_move_from_cell_or_null = function (n_cell) {
  var arr_moves = this.f_generate_moves();
  for (var i = 0; i < arr_moves.length; i+=1)
    if (arr_moves[i][0] === n_cell)
      return arr_moves[i].slice();
  return null;
};

AI.F_POSIT.prototype.f_is_game_over = function  () {
  var arr_moves = this.f_generate_moves();
  return (arr_moves.length === 0);
};

//do move by move from start position
AI.f_arr_moves_to_position = function (arr_moves) {
  var result_position = new AI.F_POSIT();
  for (var i = 0; i < arr_moves.length; i+=1)
    result_position = result_position.f_move_do_copy(arr_moves[i]);
  return result_position;
};