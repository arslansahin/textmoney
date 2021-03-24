/**
 * 24/03/2021
 * Arslan Şahin
 * enfayazilim.com
 * @type type
 */
var textMoney = {

    numberFormat: function (number, decimals, dec_point, thousands_point) {

        if (number == null || !isFinite(number)) {
            throw new TypeError("number is not valid");
        }

        if (!decimals) {
            var len = number.toString().split('.').length;
            decimals = len > 1 ? len : 0;
        }

        if (!dec_point) {
            dec_point = '.';
        }

        if (!thousands_point) {
            thousands_point = ',';
        }

        number = parseFloat(number).toFixed(decimals);

        number = number.replace(".", dec_point);

        var splitNum = number.split(dec_point);

        splitNum[0] = splitNum[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousands_point);

        number = splitNum.join(dec_point);

        return number;

    },

    init: function (money) {

        var arr1 = new Array("", "Bir", "İki", "Üç", "Dört", "Beş", "Altı", "Yedi", "Sekiz", "Dokuz");

        var arr10 = new Array("", "On", "Yirmi", "Otuz", "Kırk", "Elli", "Atmış", "Yetmiş", "Seksen", "Doksan");

        var arr100 = new Array("", "Yüz", "İki Yüz", "Üç Yüz", "Dört Yüz", "Beş Yüz", "Altı Yüz", "Yedi Yüz", "Sekiz Yüz", "Dokuz Yüz");

        var add_word = new Array("", "Bin", "Milyon", "Milyar", "Trilyon", "Katrilyon", "Kentilyon", "Seksilyon", "Septilyon", "Oktilyon");

        var money = textMoney.numberFormat(money, 2, ',', '.');

        var money_part1 = money.split(',');

        var money_part2 = money_part1[0].split('.');

        var output = '';

        var trees_len = money_part2.length;

        var addword_start = trees_len - 1;

        for (var i = 0; i < trees_len; i++) {

            if ((money_part2[i] * 1).toString().length == 3) {

                output += " " + arr100[money_part2[i].substr(0, 1)] + " " +
                        arr10[money_part2[i].substr(1, 1)] + " " +
                        arr1[money_part2[i].substr(2, 1)];

            } else if ((money_part2[i] * 1).toString().length == 2) {

                output += " " + arr10[(money_part2[i] * 1).toString().substr(0, 1)] + " " + arr1[(money_part2[i] * 1).toString().substr(1, 1)];

            } else if ((money_part2[i] * 1).toString().length == 1) {

                if (!(addword_start == 1 && money_part2[i] * 1 == 1)) {

                    output += " " + arr1[(money_part2[i] * 1).toString().substr(0, 1)];

                }

            }

            if ((money_part2[i] * 1) > 0) {

                output += " " + add_word[addword_start];

            }

            addword_start = " " + addword_start - 1;

        }


        if (money_part1[1].substr(0, 1) == 0 && money_part1[1].substr(1, 1) == 0) {

            output += 'Lira';

        } else {

            output += 'Lira ' + arr10[money_part1[1].substr(0, 1)] + " " + arr1[money_part1[1].substr(1, 1)] + ' Krş';

        }

        return output;

    }

}