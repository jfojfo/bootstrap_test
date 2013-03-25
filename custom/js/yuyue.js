if (typeof(timer) != "undefined") {
    update = function(){}
    timer();
    window.setTimeout("timer()", 1000);
}

(function(){
    window.origOnLoad = window.onload;
    window.onload = myOnLoad;
})();
function myOnLoad() {
    if (window.origOnLoad)
        window.origOnLoad();
    modify();
}
function modify() {
    for (var i = 1; i <= 17; i++) {
        var name = "p_Appointment_app_" + i;
        $('[name=' + name + ']').attr('id', name);
    }
    $('[name="p_Appointment_phonenumber"]').attr("id", "p_Appointment_phonenumber");
//    var app1=frm.p_Appointment_app_1.value;//��������Ȩ֤��
//    var app2=frm.p_Appointment_app_2.value;//��ǩ��ͬ��
//    var app3=frm.p_Appointment_app_3.value;//��˰Ʊ��
//    var app4=frm.p_Appointment_app_4.value;//�����Ƿ����
//    var app5=frm.p_Appointment_app_5.value;//��������������
//    var app6=frm.p_Appointment_app_6.value;//����֤�����
//    var app7=frm.p_Appointment_app_7.value;//����֤������
//    var app8=frm.p_Appointment_app_8.value;//����ί�д���������
//    var app9=frm.p_Appointment_app_9.value;//����ί�д�����֤�����
//    var app10=frm.p_Appointment_app_10.value;//����ί�д�����֤������
//    var app11=frm.p_Appointment_app_11.value;//���Ƿ����
//    var app12=frm.p_Appointment_app_12.value;//������������
//    var app13=frm.p_Appointment_app_13.value;//��֤�����
//    var app14=frm.p_Appointment_app_14.value;//��֤������
//    var app15=frm.p_Appointment_app_15.value;//��ί�д���������
//    var app16=frm.p_Appointment_app_16.value;//��ί�д�����֤�����
//    var app17=frm.p_Appointment_app_17.value;//��ί�д�����֤������

    $('#p_Appointment_app_date').append('<option value="--------">--------</option>');
    $('#p_Appointment_app_date').append('<option value="2013-03-28">2013-03-28</option>');
    $('#p_Appointment_app_date').append('<option value="2013-03-29">2013-03-29</option>');
    $('#p_Appointment_app_date').append('<option value="2013-03-30">2013-03-30</option>');
    $('#p_Appointment_app_date').append('<option value="2013-03-31">2013-03-31</option>');
    $('#p_Appointment_app_date').append('<option value="2013-04-08">2013-04-08</option>');
    $('#p_Appointment_app_date').append('<option value="2013-04-09">2013-04-09</option>');
    $('#p_Appointment_app_date').append('<option value="2013-04-10">2013-04-10</option>');

    $('#p_Appointment_app_1').val("1234567");
    $('#p_Appointment_app_3').val("1234567");
    $("#slwq").val("C"); // 'C' or 'CW'
    $("#wqhth").val("123456");
    $("#p_Appointment_app_date").val("2013-03-30");
    $("#p_Appointment_app_5").val("����");
    $("#p_Appointment_app_6").val("sfz"); //���֤
    $("#p_Appointment_app_7").val("110331198909090050");
    $("#p_Appointment_app_12").val("��");
    $("#p_Appointment_app_13").val("sfz");
    $("#p_Appointment_app_14").val("110331198909090051");
    $("#p_Appointment_phonenumber").val("18210068555");
    $("#p_Appointment_testmsgtemp").val("123456"); // password
    $("#p_Appointment_testmsgtempnext").val("123456");
    var checkCode = $('#checkCode').val();
    $("#j_captcha_response").val(checkCode);  // ��֤��
}

function doSave2() {
    console.log("yes, jfo -- doSave2()");

    var frm = window.document.frm;

    var qyh = document.getElementById("p_Appointment_app_3").value;
    if(qyh.length<7){
        alert("��˰ƾ֤�Ų�������7λ���֣�");
        return false;
    }
    //��ǩ��ͬ��
    var wq1 = document.getElementById("slwq").value;
    var wq2 = document.getElementById("wqhth").value;
    if(wq2.length<6){
        alert("��ǩ��ͬ������Ϊ6λ���֣�");
        return false;
    }
    if(wq1==""||wq1==null){
        alert("����ȷ��д��ǩ��ͬ�ţ�");
        return false;
    }
    if(wq2==""||wq2==null){
        alert("����ȷ��д��ǩ��ͬ�ţ�");
        return false;
    }
    var wq3 = wq1+wq2;
    document.getElementById("p_Appointment_app_2").value = wq3;

    var rv = getSelectedText("sx");
    document.getElementById("p_Appointment_app_4").value=rv;
    if("2"==rv){
        var se8 = document.getElementById("p_Appointment_app_8").value;
        var se9 = document.getElementById("p_Appointment_app_9").value;
        var se10 = document.getElementById("p_Appointment_app_10").value;

        //ȥ�ո�
        se8=trimKg(se8);
        se9=trimKg(se9);
        se10=trimKg(se10);
        if(se8==null||se9==null||se10==null||se8==""||se9==""||se10==""){
            alert("����Ϊ��λʱ������ί�д�������ϢΪ������!");
            return;
        }


    }
    var rv = getSelectedText("s");
    document.getElementById("p_Appointment_app_11").value=rv;
    if("2"==rv){
        var se15 = document.getElementById("p_Appointment_app_15").value;
        var se16 = document.getElementById("p_Appointment_app_16").value;
        var se17 = document.getElementById("p_Appointment_app_17").value;
        se15=trimKg(se15);
        se16=trimKg(se16);
        se17=trimKg(se17);
        if(se15==null||se16==null||se17==null||se15==""||se16==""||se17==""){
            alert("��Ϊ��λʱ����ί�д�������ϢΪ������!");
            return;
        }


    }
    var se1 = document.getElementById("p_Appointment_app_1").value;
    var se2 = document.getElementById("p_Appointment_app_2").value;
    var se3 = document.getElementById("p_Appointment_app_3").value;
    var se5 = document.getElementById("p_Appointment_app_5").value;
    var se6 = document.getElementById("p_Appointment_app_6").value;
    var se7 = document.getElementById("p_Appointment_app_7").value;
    var se12 = document.getElementById("p_Appointment_app_12").value;
    var se13 = document.getElementById("p_Appointment_app_13").value;
    var se14 = document.getElementById("p_Appointment_app_14").value;
    se1=trimKg(se1);
    se2=trimKg(se2);
    se3=trimKg(se3);
    se5=trimKg(se5);
    se6=trimKg(se6);
    se7=trimKg(se7);
    se12=trimKg(se12);
    se13=trimKg(se13);
    se14=trimKg(se14);



    if(se1==null||se2==null||se3==null||se5==null||se6==null||se7==null||se12==null||se13==null||se14==null||se1==""||se2==""||se3==""||se5==""||se6==""||se7==""||se12==""||se13==""||se14==""){
        //  if(se2==null||se3==null||se5==null||se6==null||se7==null||se12==null||se13==null||se14==null||se2==""||se3==""||se5==""||se6==""||se7==""||se12==""||se13==""||se14==""){
        alert("����д��������Ϣ!");
        return;
    }


    //document.getElementById("p_Appointment_temp1").value=document.getElementById("p_Appointment_server_id").value;
    //alert($('#p_Appointment_server_id').text());
    //ȡSELECT�ı�ֵ��
    document.getElementById("server_id").value=document.getElementById("p_Appointment_server_id").value;
    var service_id = document.getElementById("p_Appointment_server_id").value;
    var app_date = document.getElementById("p_Appointment_app_date").value;


    //var md = document.getElementById("p_Appointment_testmsgtemp").value;
    //var sss = md5(md);
    document.getElementById("p_Appointment_testmsg").value = sss;
    //var app_agree = document.getElementById("agree").checked;
    if (service_id == null || service_id == "") {
        alert("��ԤԼҵ�����͡�����Ϊ�գ�");
        return false;
    } else if (app_date == null || app_date == "") {
        alert("��ԤԼ���ڡ�����Ϊ�գ�");
        return false;
    }
    //else if (md == null || md == "") {
    //	alert("�������벻��Ϊ�գ�");
    //	return false;



    //} else{
    //	frm.submit();
    //}

    var app1=frm.p_Appointment_app_1.value;//��������Ȩ֤��
    var app2=frm.p_Appointment_app_2.value;//��ǩ��ͬ��
    var app3=frm.p_Appointment_app_3.value;//��˰Ʊ��
    var app4=frm.p_Appointment_app_4.value;//�����Ƿ����
    var app5=frm.p_Appointment_app_5.value;//��������������
    var app6=frm.p_Appointment_app_6.value;//����֤�����
    var app7=frm.p_Appointment_app_7.value;//����֤������

    var app8=frm.p_Appointment_app_8.value;//����ί�д���������
    var app9=frm.p_Appointment_app_9.value;//����ί�д�����֤�����
    var app10=frm.p_Appointment_app_10.value;//����ί�д�����֤������

    var app11=frm.p_Appointment_app_11.value;//���Ƿ����
    var app12=frm.p_Appointment_app_12.value;//������������
    var app13=frm.p_Appointment_app_13.value;//��֤�����
    var app14=frm.p_Appointment_app_14.value;//��֤������

    var app15=frm.p_Appointment_app_15.value;//��ί�д���������
    var app16=frm.p_Appointment_app_16.value;//��ί�д�����֤�����
    var app17=frm.p_Appointment_app_17.value;//��ί�д�����֤������


    var phonenumber=frm.p_Appointment_phonenumber.value;
    var testmsg=frm.p_Appointment_testmsgtemp.value;


    //��֤֤�������Ƿ��ظ�
    if(ifChongfu(app7,app10,app14,app17)==false){
        alert("֤�����벻���ظ���");
        return false;
    }


    if(checktelephone(phonenumber)==false){
        alert("����д��ȷ���ֻ��ţ�");
        return false;
    }else if((testmsg==null||trimKg(testmsg)==""||trimKg(testmsg).length<6)){
        alert("������6λ��������,���ܰ����ո�");
        return false;
    }
    /*else if(checkpwd(testmsg)==false){
     alert("��������ֻ��Ϊ���ֺ���ĸ");
     return false;
     }*/
    else if(validateCode('j_captcha_response','checkCode')==false){
        alert("��������ȷ����֤�룡");
        return false;
    }else{

        if(app6=='sfz'){
//            if(isApply2(app7)==false){
//                return false;
//            }

        }
        if(app6=='jgz'||app6=='gaz'||app6=='hz'||app6=='qt'||app6=='zzjgdm'||app6=='yyzzh'){
//            if(isApply(app7)==false){
//                return false;
//            }
        }
        if(app9=='sfz'){
//            if(isApply2(app10)==false){
//                return false;
//            }
        }
        if(app9=='jgz'||app9=='gaz'||app9=='hz'||app9=='qt'||app9=='zzjgdm'||app9=='yyzzh'){
//            if(isApply(app10)==false){
//                return false;
//            }
        }
        if(app13=='sfz'){
//            if(isApply2(app14)==false){
//                return false;
//            }
        }
        if(app13=='jgz'||app13=='gaz'||app13=='hz'||app13=='qt'||app13=='zzjgdm'||app13=='yyzzh'){
//            if(isApply(app14)==false){
//                return false;
//            }
        }

        if(app16=='sfz'){
//            flag4= isApply2(app17);
        }
        if(app16=='jgz'||app16=='gaz'||app16=='hz'||app16=='qt'||app16=='zzjgdm'||app16=='yyzzh'){
//            flag4= isApply(app17);
        }

        var md = document.getElementById("p_Appointment_testmsgtemp").value;
        var mdnext = document.getElementById("p_Appointment_testmsgtempnext").value;
        if(md!=mdnext){
            alert("��������ĸ������벻һ�£����������룡");
        }else{
            var sss = md5(md);
            document.getElementById("p_Appointment_testmsg").value = sss;
            document.getElementById("p_Appointment_app_date").value=app_date;
            frm.p_Appointment_app_person_button.disabled=true;
            frm.submit();
        }

    }

}


function doShow2() {
    var frm = window.document.frm;

    var service_id = document.getElementById("p_Appointment_server_id").value;

//    if (service_id == null || service_id == "") {
//        alert("��ѡ��ԤԼҵ�����ͣ�");
//
//        return false;
//    }
    /*else if(validateCode('j_captcha_response','checkCode')==false){
     alert("��������ȷ����֤�룡");
     return false;
     }*/
//    else {
        document.getElementById("service_ne").value = document
            .getElementById("p_Appointment_server_id").value;//����ѡ�������
        $('#service_ne').val("297edff83cf6b763013cf631de820001");
        frm.p_Appointment_app_person_button.disabled=true;

        frm.action="yyfh.appointment.do";
        frm.m.value = "edit";
        frm.submit();
//    }
}

window.alert = console.log;
//@ sourceURL=yuyue.js
