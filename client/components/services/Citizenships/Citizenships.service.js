'use strict';

angular.module('abroadathletesApp')
    .factory('CitizenShips', function ($http) {
        var array = {
            'citizenships': []
        };

        var data = [

            {"name":"Afghans"},
            {"name":"Albanians"},
            {"name":"Algerians"},
            {"name":"Americans"},
            {"name":"Andorrans"},
            {"name":"Angolans"},
            {"name":"Argentines"},
            {"name":"Armenians"},
            {"name":"Aromanians"},
            {"name":"Arubans"},
            {"name":"Australians"},
            {"name":"Austrians"},
            {"name":"Azeris"},
            {"name":"Bahamians"},
            {"name":"Bahrainis"},
            {"name":"Bangladeshis"},
            {"name":"Barbadians"},
            {"name":"Belarusians"},
            {"name":"Belgians"},
            {"name":"Belizeans"},
            {"name":"Bermudians"},
            {"name":"Boers"},
            {"name":"Bosniaks"},
            {"name":"Brazilians"},
            {"name":"Bretons"},
            {"name":"British"},
            {"name":"British Virgin Islanders"},
            {"name":"Bulgarians"},
            {"name":"Burmeses"},
            {"name":"Macedonian Bulgarians"},
            {"name":"Burkinabès"},
            {"name":"Burundians"},
            {"name":"Cambodians"},
            {"name":"Cameroonians"},
            {"name":"Canadians"},
            {"name":"Catalans"},
            {"name":"Cape Verdeans"},
            {"name":"Chadians"},
            {"name":"Chileans"},
            {"name":"Chinese"},
            {"name":"Colombians"},
            {"name":"Comorians"},
            {"name":"Congolese"},
            {"name":"Croatians"},
            {"name":"Cubans"},
            {"name":"Cypriots"},
            {"name":"Turkish Cypriots"},
            {"name":"Czechs"},
            {"name":"Danes"},
            {"name":"Dominicans (Republic)"},
            {"name":"Dominicans (Commonwealth)"},
            {"name":"Dutch"},
            {"name":"East Timorese"},
            {"name":"Ecuadorians"},
            {"name":"Egyptians"},
            {"name":"Emiratis"},
            {"name":"English"},
            {"name":"Eritreans"},
            {"name":"Estonians"},
            {"name":"Ethiopians"},
            {"name":"Faroese"},
            {"name":"Finns"},
            {"name":"Finnish Swedish"},
            {"name":"Fijians"},
            {"name":"Filipinos"},
            {"name":"French citizens"},
            {"name":"Georgians"},
            {"name":"Germans"},
            {"name":"Baltic Germans"},
            {"name":"Ghanaians"},
            {"name":"Gibraltar"},
            {"name":"Greeks"},
            {"name":"Greek Macedonians"},
            {"name":"Grenadians"},
            {"name":"Guatemalans"},
            {"name":"Guianese (French)"},
            {"name":"Guineans"},
            {"name":"Guinea-Bissau nationals"},
            {"name":"Guyanese"},
            {"name":"Haitians"},
            {"name":"Hondurans"},
            {"name":"Hong Kong"},
            {"name":"Hungarians"},
            {"name":"Icelanders"},
            {"name":"I-Kiribati"},
            {"name":"Indians"},
            {"name":"Indonesians"},
            {"name":"Iranians (Persians)"},
            {"name":"Iraqis"},
            {"name":"Irish"},
            {"name":"Israelis"},
            {"name":"Italians"},
            {"name":"Ivoirians"},
            {"name":"Jamaicans"},
            {"name":"Japanese"},
            {"name":"Jordanians"},
            {"name":"Kazakhs"},
            {"name":"Kenyans"},
            {"name":"Koreans"},
            {"name":"Kosovo Albanians"},
            {"name":"Kurds"},
            {"name":"Kuwaitis"},
            {"name":"Kyrgyzs"},
            {"name":"Lao"},
            {"name":"Latvians"},
            {"name":"Lebanese"},
            {"name":"Liberians"},
            {"name":"Libyans"},
            {"name":"Liechtensteiners"},
            {"name":"Lithuanians"},
            {"name":"Luxembourgers"},
            {"name":"Macedonians"},
            {"name":"Malagasy"},
            {"name":"Malaysians"},
            {"name":"Malawians"},
            {"name":"Maldivians"},
            {"name":"Malians"},
            {"name":"Maltese"},
            {"name":"Manx"},
            {"name":"Mauritians"},
            {"name":"Mexicans"},
            {"name":"Moldovans"},
            {"name":"Moroccans"},
            {"name":"Mongolians"},
            {"name":"Montenegrins"},
            {"name":"Namibians"},
            {"name":"Nepalese"},
            {"name":"New Zealanders"},
            {"name":"Nicaraguans"},
            {"name":"Nigeriens"},
            {"name":"Nigerians"},
            {"name":"Norwegians"},
            {"name":"Pakistanis"},
            {"name":"Palauans"},
            {"name":"Palestinians"},
            {"name":"Panamanians"},
            {"name":"Papua New Guineans"},
            {"name":"Paraguayans"},
            {"name":"Peruvians"},
            {"name":"Poles"},
            {"name":"Portuguese"},
            {"name":"Puerto Ricans"},
            {"name":"Quebecers"},
            {"name":"Réunionnais"},
            {"name":"Romanians"},
            {"name":"Russians"},
            {"name":"Baltic Russians"},
            {"name":"Rwandans"},
            {"name":"Salvadorans"},
            {"name":"São Tomé and Príncipe"},
            {"name":"Saudis"},
            {"name":"Scots"},
            {"name":"Senegalese"},
            {"name":"Serbs"},
            {"name":"Sierra Leoneans"},
            {"name":"Singaporeans"},
            {"name":"Sindhian"},
            {"name":"Slovaks"},
            {"name":"Slovenes"},
            {"name":"Somalis"},
            {"name":"South Africans"},
            {"name":"Spaniards"},
            {"name":"Sri Lankans"},
            {"name":"St Lucians"},
            {"name":"Sudanese"},
            {"name":"Surinamese"},
            {"name":"Swedes"},
            {"name":"Swiss"},
            {"name":"Syriacs"},
            {"name":"Syrians"},
            {"name":"Taiwanese"},
            {"name":"Tanzanians"},
            {"name":"Thais"},
            {"name":"Tibetans"},
            {"name":"Tobagonians"},
            {"name":"Trinidadians"},
            {"name":"Tunisians"},
            {"name":"Turks"},
            {"name":"Tuvaluans"},
            {"name":"Ugandans"},
            {"name":"Ukrainians"},
            {"name":"Uruguayans"},
            {"name":"Uzbeks"},
            {"name":"Vanuatuans"},
            {"name":"Venezuelans"},
            {"name":"Vietnamese"},
            {"name":"Welsh"},
            {"name":"Yemenis"},
            {"name":"Zambians"},
            {"name":"Zimbabweans"}

        ];

        angular.forEach(data, function(value,key){
            array.citizenships.push(value.name)
        });


        array.football = array['citizenships']; //temporary hack for creator football name

        return {
            getCitizenShips: function (value) {
                value = value || '';
                return _.get(array, value.toLowerCase(), []);
            }
        }
    });
