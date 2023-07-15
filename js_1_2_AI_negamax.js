AI.f_negamax = function(P) {
  var arr_moves = P.f_generate_moves();

  if (arr_moves.length === 0) return (-100 + P.n_moves_done);

  var max = -Infinity;

  for (var i = 0; i < arr_moves.length; i += 1) 
    max = Math.max(max, -AI.f_negamax(P.f_move_do_copy(arr_moves[i])));

  return max;
};

AI.F_POSIT.prototype.f_negamax = function() {return AI.f_negamax(this); };
AI.F_POSIT.prototype.f_score_comment = function() {
  var score = this.f_negamax();
  //value for opponent
  var string_who = (score > 0) ? "Проигрыш за" : "ПОБЕДА за";
  var string_amount = Math.abs(Math.abs(score) - 100) - this.n_moves_done + 1;
  function f_string_amount(i) {
    if (i === 1) return "ход";
    if ((i === 2)||(i === 3)||(i === 4)) return "хода";
    return "ходов";
  }
  return string_who + " " + string_amount + " " + f_string_amount(string_amount);
};

AI.F_POSIT.prototype.f_best_move = function () {
  var arr_moves = this.f_generate_moves();
  var arr_score = AI.f_arr_generate(arr_moves.length, i => this.f_move_do_copy(arr_moves[i]).f_negamax());
  
  var best_i = 0;
  for (var i = 0; i < arr_moves.length; i+=1)
    if (arr_score[i] < arr_score[best_i]) 
      best_i = i;

  //console.log("arr_score[best_i]", arr_score[best_i]);
  return arr_moves[best_i];
};

AI.F_POSIT.prototype.f_play_best_move = function () {
  if (this.f_is_game_over()) {return; }
  var best_move = this.f_best_move()
  var best_next = this.f_move_do_copy(best_move);
  //console.log("this.posit", this.posit, "best_move", best_move);
  this.posit = best_next.posit.slice();
  this.who *= -1; 
  this.n_moves_done += 1;
};

AI.F_POSIT.prototype.f_console = function (text_info = "Default f_console ") {
  console.log(text_info, this.f_negamax(), this.f_best_move());
};
