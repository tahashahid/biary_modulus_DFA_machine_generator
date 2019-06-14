app.controller('HomeController',
    function($scope, $timeout) {

        var DFA = null,
            DFAVisual = null;
            // DFAVisual = null;
            // converter = new Converter();

        // $scope.nfaInput = ' ';

        $scope.initializeDFA = function() {
            var width = $('#DFA').innerWidth(),
                height = $('#DFA').parent().innerHeight();
                DFAVisual = new ForceGraph('#DFA', width, height);
                DFAVisual.forceGravity = 0.009
                window.DFAVisual = DFAVisual;
            // NFA = new FSA();
            // converter.nfa = NFA;

            // $scope.sampleNFA1();
            // syncNFA();
        }

        
        
        $scope.addState = function(name) {
            var id = name || '';
            while (id.trim().length === 0 || id.trim().length > 3) {
                id = prompt('Nom d\'etat (max 3 caracters)', '');
            }
            if (id === null) return;
            DFAVisual.addNode(id);
            // syncNFA();
        }

        $scope.addTransition = function(from, input, to) {
            var symbols = input || '',
                source = from || '',
                target = to || '';
            
            DFAVisual.addLink(symbols, source, target);
            // syncNFA();
        }

        // $scope.setStartState = function() {
        //     DFAVisual.toggleClass('.selected', 'start', false);
        //     var id = d3.select('.selected.start').attr('id').replace('DFA-N', '');

        //     DFAVisual.toggleClass('.selected.start', 'selected', false);
        //     DFAVisual.setNodeProperty(id, 'fixedPosition', {
        //         'x': DFAVisual.nodeRadius * 4,
        //         'y': DFAVisual.nodeRadius * 4
        //     });
        //     // syncNFA();
        // }

        // $scope.setAcceptStates = function() {
        //     DFAVisual.toggleClass('.selected', 'accept', true);
        //     DFAVisual.toggleClass('.selected.accept', 'selected', true);
        //     // syncNFA();
        // }

        $scope.reset = function() {
            DFAVisual.reset();
            // if (DFAVisual !== null) {
            //   DFAVisual.reset();
            //   converter.reset();
            // }
            // syncNFA();
        }


        // $scope.updateNFAInput = function() {
        //     var userNFA = {
        //         states: [],
        //         transitions: [],
        //         start: '',
        //         accept: []
        //     }, tmp, i;

        //     tmp = DFAVisual.getNodes();
        //     for (i = 0; i < tmp.length; i++) {
        //         userNFA.states.push(tmp[i].label);
        //     }

        //     tmp = DFAVisual.getLinks();
        //     for (i = 0; i < tmp.length; i++) {
        //         userNFA.transitions.push({
        //             symbol: tmp[i].label,
        //             source: tmp[i].source.label,
        //             target: tmp[i].target.label
        //         });
        //     }

        //     userNFA.start = DFA.startState;
        //     tmp = DFA.acceptStates;
        //     for (i = 0; i < tmp.length; i++) {
        //         userNFA.accept.push(tmp[i]);
        //     }

        //     this.nfaInput = JSON.stringify(userNFA, null, 2);
        // }

        
        // var states = [];
        var rStatesHash = { 0: { txt: '0'}};
        $scope.generateFA = function(modNum){
            if(modNum > 100){
                return alert('please select less then 100');
            }
            $scope.reset();
            if(modNum < 2) return false;
            for(var i = 0; i < modNum; i++){
                $scope.addState('Q'+i);
                // states.push([]);
                // rStatesHash[i] = {zero: false, one: false, txt: ''}
            }
            $scope.addTransition('Q0', '0','Q0');
            rStatesHash[0] = {zero: true, one: false, txt: '0'};

            DFAVisual.toggleClass('#DFA-NQ0', 'accept', true);
            DFAVisual.toggleClass('#DFA-NQ0', 'start', true);
            var completed = [];
            for(var i = 0; i <= modNum; i++){
                if(i == modNum && Object.keys(rStatesHash).length){
                    i = -1;
                    continue;
                }
                for(var key in rStatesHash){
                    var ps = rStatesHash[key];
                    if(!ps.zero){
                        if(binToDec(ps.txt + '0') % modNum == i){
                            $scope.addTransition('Q' + key, '0','Q'+i);
                            if(!(completed.indexOf(""+i) + 1)){
                                rStatesHash[i] = rStatesHash[i] || {zero: false, one: false, txt: ps.txt + '0'};  
                            }
                            ps.zero = true;
                            
                        }
                    }
                    if(!ps.one){
                        if(binToDec(ps.txt + '1') % modNum == i){
                            $scope.addTransition('Q'+ key, '1','Q'+i);
                            if(!(completed.indexOf(""+i) + 1)){
                                rStatesHash[i] = rStatesHash[i] || {zero: false, one: false, txt: ps.txt + '1'};
                            }
                            ps.one = true;
                        }
                    }
                    if(ps.zero && ps.one){
                        delete rStatesHash[key];
                        completed.push(key);
                    }
                }
                
                // states[0]
            }
            
        }
        // function transition(mod, i){
        //     var zero = true, one = true;
        //     while(zero || one){
        //         decToBin(mod);
        //         stateInputHash[]
        //     }
        // }
        function binToDec(num){
            return parseInt(num, 2);
        }
        // function decToBin(num){
        //     var str = "" + num;
        //     var bin = (+str).toString(2);
        //     return bin;
        // }
        $timeout(function(){
            $scope.generateFA(3)
        }, 1000)
        // $scope.generateFA(3)
        

    });
