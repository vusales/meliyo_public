import React from 'react';
import { 
    Text, 
    View,
    StyleSheet , 
    StatusBar , 
    SafeAreaView ,
} from 'react-native';
import helper from '../helpers/helper';
import colors from '../values/colors';
import icons from '../values/icons';
import CommonLayout from '../layouts/CommonLayout';


const Terms = ({
    params,
}) =>{

return (
    <CommonLayout
        showDrawerButton={false}
        pageName={helper.translate("termsPageTitle")}
        showSearchComponent={false}
    > 
        <Text style={styles.title}>ŞƏRTLƏR VƏ QAYDALAR ÜMUMİ MÜDDƏALAR</Text>
        
        <Text style={styles.text}>Bu İstifadə Şərtləri (“Şərtlər”) Sizinlə “MELİYO” MMC arasında hüquqi bağlılıq yaradan razılaşmanı təşkil edir və Sizin “meliyo.com” sayta və “Meliyo” mobil tətbiqə (bundan sonra – “Sistem”) girişinizi və ondan istifadə qaydalarını tənzimləyir. Sistemə daxil olmaqla Siz, bu Şərtləri oxuduğunuzu, başa düşdüyünüzü və bu Şərtlərlə tam və qeyd-şərtsiz razılaşdığınızı təsdiq edirsiniz. 
        Bu Şərtlərdə aşağıdakı təriflərdən istifadə edilir: 
        - “İstifadəçi” və ismin müvafiq hallarında “Siz” dedikdə, Sistemə daxil olan və bu Şərtləri qəbul etməklə ondan istifadə edən şəxs başa düşülür. 
        - “Şirkət” və ya ismin müvafiq hallarında “Biz” dedikdə, “MELİYO” MMC başa düşülür. 
        - “Sistem” dedikdə, “meliyo.com” sayta və “Meliyo” mobil tətbiq başa düşülür.
        - “Tərəf” ayrılıqda Sizi və ya Bizi, “Tərəflər”dedikdə, birlikdə həm Siz, həm də Biz başa düşülürük.</Text>
        
        <Text style={styles.title}> İSTİFADƏÇİNİN TƏMİNATLARI </Text>

        <Text style={styles.text}>Sistemdən istifadə etməklə Siz təminat verirsiz ki: 
        -	təqdim etdiyiniz bütün məlumatlar həqiqidir, doğrudur və tamdır;
        -	bu məlumatların doğruluğunu təmin edəcəksiniz və dəyişiklik olduqda, yeniləyəcəksiniz;
        -	fəaliyyət qabiliyyətlisiniz və Şərtlərə əməl etməyə razısınız; 
        -	yaşınız 18 yaşdan az deyil; 
        -	Sistemdən heç bir qanunsuz və ya icazəsiz məqsəd üçün istifadə etməyəcəksiniz.
        Əgər Siz yalan, səhv və ya natamam məlumat təqdim edərsizsə, Biz sizin hesabı dayandırmaq və ya ləğv etmək və Sistemdən istifadənizə icazə verməmək hüququnu həyata keçirə bilərik. </Text>
        
        <Text style={styles.title}>İSTİFADƏÇİNİN HESABI</Text>

        <Text style={styles.text}>Əgər Siz bu Sistemdən istifadə edirsinizsə, Siz hesabınızın və parolunuzun məxfiliyinin qorunmasına və hesabınıza girişin məhdudlaşdırılmasına görə cavabdehsiniz və hesabınızda həyata keçirilən bütün əməliyyatlara görə məsuliyyət daşıdığınızı qəbul edirsiz. Siz hesabınızı heç bir digər şəxsə və ya quruma ötürə və ya güzəşt edə bilməzsiniz. Hesabınızın oğurlanmasına və ya digər formada ələ keçirilməsinə, üçüncü şəxslərin Sizin hesaba daxil olmasına görə Şirkətin heç bir məsuliyyət daşımadığını qəbul edirsiniz. Şirkət istənilən vaxt Sistemi dayandırmaq və ya ləğv etmək, heabları dayandırmaq və ya silmək hüququnu müstəsna olaraq özündə saxlayır.</Text>

        <Text style={styles.title}>SİSTEMDƏN İSTİFADƏ QAYDALARI</Text>

        <Text style={styles.text}>Sistem İstifadəçilərin qeydiyyatdan keçməklə onların idarə biləcəkləri platformadır və məşhur şəxslərin adından onlar üçün müxtəlif hədiyyə imkanları yaradır.
        Sizdən Sistemdə qeydiyyatdan keçməniz tələb olunur. Qeydiyyat zamanı ad, soyad, e-poçt ünvanı qeyd olunur. Qeydiyyat həmçinin müxtəlif sosial şəbəkələrdəki hesabla da mümkündür. Əgər istifadəçi adınız əxlaq normalarına zidd, çaşdırıcı və üçüncü şəxslərin hüquqlarını pozan digər sözlərdən ibarət olarsa, Biz bu istifadəçi adını silmək və ya dəyişmək hüququnu özümüzdə saxlayırıq.
        Sistem aşağıdakı funksiyalara malikdir və cihazınızda bu funksiyaların hər birindən istifadə zamanı razılıq tələb olunacaqdır:
        - Sistem istifadəçilərlə məşhur şəxslər arasında əlaqə qurmaq imkanları yaradır;
        - Sistem istifadəçilərin istəyi ilə məşhur şəxslərə sifarişli video təbrik çəkmə imkanı verir;</Text>
        
        <Text style={styles.title}>FƏRDİ MƏLUMATLARIN QORUNMASI</Text>

        <Text style={styles.text}>Bu Şərtlərin məqsədləri üçün fərdi məlumatlar “Fərdi məlumatlar haqqında” Azərbaycan Respublikasının Qanunu ilə müəyyən olunduğu kimi şəxsin kimliyini birbaşa və ya dolayısı ilə müəyyənləşdirməyə imkan verən istənilən məlumatdır. 
        Fərdi məlumatların toplanması, istifadəsi və qorunması “Fərdi məlumatlar haqqında” Azərbaycan Respublikasının Qanununa, digər hüquqi aktlara və bu Şərtlərə uyğun olaraq həyata keçirilir.
        Sistemdə hesab yaradaraq İstifadəçi burada göstərilən məqsədlər üçün fərdi məlumatların toplanılmasına, istifadəsinə və işlənilməsinə açıq və müstəqil şəkildə razılıq verir.
        İstifadəçinin toplanılması, istifadəsi və işlənilməsi üçün razılığını bildirdiyi fərdi məlumatlar, bu Şərtlər ilə müəyyən edilmiş öhdəliklərin yerinə yetirilməsi, İstifadəçi üçün müxtəlif üstünlüklərin təmin olunması, Sistemin fəaliyyəti üçün zəruri olan tətbiqlərin təkmilləşdirilməsi, istifadəçi-əsaslı reklam, satış, marketinq, anketlər, profilləşdirmə, statistik tədqiqatlar və s. bu kimi oxşar məqsədlərlə bütün növ elektron ünsiyyət məqsədləri üçün toplanılacaq, istifadə ediləcək və işləniləcəkdir.

        Biz, Sizin fərdi məlumatlarınızın qorunması öhdəliyini daşıyırıq. Şirkət daxilində icazə verilmiş işçilər yalnız zərurət olduğu təqdirdə, toplanmış məlumatlardan istifadə edə bilərlər. Kompyuter sistemlərinə və məlumatlarına qanunsuz müdaxilələr olduğu təqdirdə, Biz bu cür müdaxilələri araşdıraraq bu əməlləri törədən şəxslərin məsuliyyətə cəlb edilməsi üçün aidiyyəti dövlət orqanlarına müraciət edəcəyik və/və ya mülki qaydada vurulmuş zərərin ödənilməsi üçün məhkəməyə müraciət edəcəyik.

        Şirkət fərdi məlumatları qanunvericiliklə nəzərdə tutulmuş hallarda və çərçivədə dövlət orqanları və ya bu funksiyaların həvalə edildiyi digər qurumlar tərəfindən Şirkətə sorğu edildiyi təqdirdə, onlara açıqlayacaqdır.</Text>

        <Text style={styles.title}>MƏXFİLİK</Text>

        <Text style={styles.text}>İstifadəçilər barədə verilənlər məxfi hesab olunur və qanunla müəyyən edilmiş hallar istisna olmaqla, üçüncü şəxslərə ötürülmür. İstifadəçilər, Bizə sorğu verdiyi təqdirdə, özləri barədə Sistemdə toplanmış məlumatların surətini əldə etmək hüququna malikdirlər. Biz Sizin fərdi məlumatlarınızı heç bir üçüncü şəxsə satmayacaq, onlarla paylaşmayacaq və ya onların istifadələrinə verməyəcəyik. </Text>

        <Text style={styles.title}>ƏQLİ MÜLKİYYƏT HÜQUQLARI</Text>

        <Text style={styles.text}>Sistem Şirkətin əqli mülkiyyəti hesab edilir və bura daxil edilmiş və ya yerləşdirilmiş bütün mənbə kodları, verilənlər bazası, proqram təminatı, dizayn, audio, video, mətn, fotoşəkil və qrafikləri (“Məzmun”) və orada əks olunan əmtəə nişanları, xidmət nişanları və loqolar (“Nişanlar”) və ya onların kombinasiyası Bizə məxsusdur və ya tərəfimizdən lisenziya hüququ ilə istifadə edilir. Şirkət Məzmun və Nişanlar üzərində bütün qanuni və müstəsna hüquqlarını qoruyur. 
        Məzmun və Nişanlardan Siz yalnız Sistemə daxil olarkən şəxsi məqsəd üçün istifadə edə bilərsiniz. Məzmun və ya Nişanlar və ya onların hər hansı hissəsindən başqa məqsəd üçün istifadə etmək qadağandır. Siz, Məzmunda olanların heç birisini, bütövlükdə və ya bir hissədə dəyişdirə, dərc edə, ötürə, paylaşa, çoxalda, barələrində mühəndis təhlili apara, satışında iştirak edə, onlardan törəmə məhsullar hazırlaya bilməzsiniz. Sistemdən istifadə Sizə qorunan Məzmundan icazəsiz istifadə etməyə və heç bir Məzmunda əqli mülkiyyət bildirişləri və ya işarələrini, aidiyyət nişanlarını silməyə icazə vermir. 
        İstifadəçinin hərəkəti və ya hərəkətsizliyi nəticəsində Şirkətin əqli mülkiyyət hüquqları pozularsa, o, Şirkətə dəymiş bütün birbaşa və dolayı zərərlərə görə məsuliyyət daşıyır və dəymiş zərərin əvəzini ödəməlidir.</Text>


        <Text style={styles.title}>MƏSULİYYƏTİN MƏHDUDLAŞDIRILMASI</Text>

        <Text style={styles.text}>Sistemdə verilən məlumatlar hər hansı bir təminat vermədən yerləşdirilmişdir. Sistemə daxil edilmiş və ya onun vasitəsilə istifadə edilə bilən informasiya, proqram təminatı, məhsullar və s. qeyri-dəqiqliklərə və tipoqrafik səhvlərə malik ola bilər. Dəyişikliklər burada mövcud olan informasiyaya mütəmadi edilə bilər. Şirkət və/və ya onun nümayəndələri istənilən vaxt Sistemdə təkmilləşdirmələr və dəyişikliklər apara bilər. 
        Şirkət heç bir məqsəd üçün Sistemdə olan informasiyaya, proqram təminatlarına, məhsullara və digər aidiyyəti qrafiklərə münasibətdə onların uyğunluğu, etibarlılığı, istifadəliliyi, kəsintisiz olması və dəqiqliyinə heç bir zəmanət vermir. Şirkət sadalananlara münasibətdə heç bir zəmanət və şərtləri qəbul etmir və bu Sistemdən istifadə etməklə Siz Şirkət qarşısında bu cür iddia və tələblər irəli sürməyəcəyinizi qəbul edirsiniz. 
        Şirkət Bu Sistemə və onun Məzmununa aid, eləcə də Şirkətin nümayəndələri, filialları və s. üçüncü şəxslər tərəfindən verilə bilən, o cümlədən Sistemdə buraxılmış hər hansı çatışmazlıqlar daxil olmaqla, təminatları istisna edir.
        Qanunvericiliyin icazə verdiyi həddə, heç bir halda şirkət olaraq Biz və Bizim işçilər və ya digər nümayəndələrimiz Siz və ya hər hansı üçüncü şəxs qarşısında Sizin Sistemdən istifadə etməyinizdən irəli gələn və ya bununla bağlı olan, o cümlədən, istifadə zamanı kəsintilərin olmasından və ya istifadənin qeyri-mümkün olmasından irəli gələn heç bir zərərə görə məsuliyyət daşımır. Bu halda zərər, heç bir məhdudiyyət olmadan birbaşa zərər, əldən çıxmış fayda, sizin kompyuterə, mobil telefona və digər qurğuya, proqram təminatlarına və sistemlərə və bunlarda yazılan verilənlərin itirilməsinə görə zərər və digər real, dolayı, təsadüfi və cərimə xarakterli zərərə görə, bu cür zərər barədə xəbərdar edilsək belə, məsuliyyət daşımırıq.
        Sadalananlar istehlakçı qismində Sizə qanunla məxsus olan hüquqlara xələl gətirmir. 
        Əgər Sistemdən və ya onun bir hissəsindən istifadə sizi qane etmirsə və ya Siz bu Şərtlərdən narazısınızsa, Siz yalnız Sistemdən istifadəni dayandırmaqla öz müdafiənizi həyata keçirə bilərsiniz. </Text>

        <Text style={styles.title}>QANUNSUZ VƏ YA QADAĞAN EDİLMİŞ İSTİFADƏ</Text>

        <Text style={styles.text}>Sizə hazırkı Şərtlərə uyğun olaraq Sistemdən istifadə üçün müstəsna olmayan, ötürülə bilməyən və geri götürülə bilən çıxış imkanı verilir. Buradan istifadə şərti olaraq, Siz Sistemdən qanunsuz və ya bu Şərtlərlə qadağan edilmiş heç bir məqsəd üçün istifadə etməyəcəyinizi öhdənizə götürürsünüz. Siz Sistemdən ona zərər vura bilən, yüklənməsinə və ya işləməməsinə səbəb olan şəkildə istifadə edə, eləcə də üçüncü şəxslərin Sistemdən istifadəsinə müdaxilə edə bilməzsiniz. Siz Sistemdə yerləşdirilməmiş və ya başqa formada təqdim edilməmiş hər hansı bir material və ya məlumatı heç bir üsulla əldə edə və ya buna cəhd edə bilməzsiniz.</Text> 

        <Text style={styles.title}>İSTİFADƏ İMKANI</Text>

        <Text style={styles.text}>Sistemdən 18 yaşı tamam olmuş şəxslər istifadə edə bilər. 18 yaşdan aşağı şəxslərin bu Sistemdən istifadəsi qadağandır.
        Əgər başqa cür müəyyən edilməzsə, Sistemdə verilən imkanlardan istifadə Azərbaycan Respublikasının ərazisində mümkündür. İstənilən reklam və bu xarakterli digər məlumat yalnız Azərbaycan bazarı üçün nəzərdə tutulmuşdur. Sistemin və ya Məzmununun və ya onların bir hissəsinin yayılması və ya yenidən dərc edilməsi qadağandır. Şirkət Sistemin kəsintisiz və qüsursuz işləyəcəyinə heç bir təminat vermir. </Text>

        <Text style={styles.title}>KOMPENSASİYA</Text>

        <Text style={styles.text}>Sizi Bizi, o cümlədən bizim işçiləri, agentləri, tərəfdaşları, törəmə cəmiyyətləri və ya filiallarını  Sizin Sistemdən istifadə etməyinizə və ya düzgün istifadə etməməyinizə; bu Şərtləri pozmağınıza; Şərtlərdə verdiyiniz istənilən təminatı pozmağınıza və ya əməl etməməyinizə; üçüncü şəxslərin hüquqlarını, o cümlədən əqli mülkiyyət hüquqlarını pozmağınıza; Sistemdən istifadə edən digər istifadəçilərə qarşı hüquqazidd davranışlarınıza;  qanunvericiliyin tələblərini pozmağınıza görə yaranmış və ya sadalanan hallardan irəli gələn bütün və istənilən zərər, itki, məsuliyyət, iddia və ya tələb, o cümlədən vəkil və digər məhkəmə xərclərindən qorumaq və sadalananlara görə kompensasiya etmək öhdəliyini daşıyırsınız. Yuxarıda göstərilənlərə baxmayaraq, Biz sizin hesabınıza müdafiəmizi həyata keçirməyə və istənilən təhlükə törədə bilən məsələni nəzarətdə saxlamağa müstəsna hüquqa malik olacağıq və Bizim bu cür müdafiəni həyata keçirərkən Siz öz vəsaitiniz hesabınıza Bizlə əməkdaşlıq etməyə öz razılığınızı vermiş sayılırsınız. Biz, yuxarıda Sizdən kompensasiya almağa hüquq verən istənilən bu cür tələb, proses və s. hallar barədə məlumatlı olan kimi Sizi xəbərdar etmək üçün lazımi səyi göstərəcəyik. </Text>

        <Text style={styles.title}>HÜQUQLARDAN İMTİNA ETMƏMƏ</Text>

        <Text style={styles.text}>Hər hansı Tərəfin bu Şərtlərə ciddi əməl edilməsini digər Tərəfdən tələb etməməsi və ya əməl etməməyə görə digər Tərəfə qarşı bu Şərtlərdə verilən hüquqi müdafiə vasitələrindən istifadə etməməsi, həmin hüquqlar və ya tələblərdən imtina kimi şərh edilə bilməz və əməl etməyən Tərəfə münasibətdə Şərtlərdəki öhdəliklərin həcminin azaldılmasına gətirib çıxara bilməz. 
        MÜDDƏT VƏ XİTAM VERMƏ

        Hazırkı Şərtlər Sizin Sistemdən istifadə etdiiniz müddətdə qüvvədədir. Bu Şərtlərin digər müddəalarını məhdudlaşdırmadan Biz öz mülahizəmizə əsasən və heç bir bildiriş vermədən Sistemə çıxış imkanını və ondan istifadəni istənilən şəxsə münasibətdə istənilən səbəbdən, o cümlədən bu Şərtlərdə verilmiş istənilən təminatı və ya öhdəlikləri, eləcə də qanunvericiliyin tələblərini pozmağa görə dayandırmaq və ya başqa cür məhdudlaşdırmaq hüququnu özümüzdə saxlayırıq. Biz Sizin Sistemdən istifadənizi ləğv edə və ya hesabınızı, eləcə də hesabınızda yerləşdirdiyiniz istənilən məlumatı xəbərdarlıq etmədən silə bilərik. 
        Əgər Biz Sizin hesabınızı hər hansı səbəbdən ləğv edir və ya dayandırırıqsa, Siz öz adınızla, uydurma adla, üçüncü şəxsin adından çıxış etsəz belə, üçüncü şəxslərin adları ilə qeydiyyatdan keçə və yeni hesab yarada bilməzsiniz. Sizin hesabı ləğv etmək və ya dayandırmaq hüququ ilə yanaşı, Biz lazımi hüquqi addımlar atmaq, o cümlədən mülki qaydada iddia qaldırmaq, inzibati və ya cinayət məsuliyyətinə cəlb edilmə üçün müraciət etmək hüquqlarını özümüzdə saxlayırıq.</Text>

        <Text style={styles.title}>DƏYİŞİKLİKLƏR VƏ DAYANMALAR</Text>

        <Text style={styles.text}>Biz müstəsna olaraq, öz mülahizəmizə əsasən Şərtlərə və Sistemə istənilən vaxt dəyişiklik etmək, yeniləmək və ya müəyyən hissəsini və ya tam silmək hüququnu özümüzdə saxlayırıq. Sistemə vaxtaşırı yerləşdiriləcək əlavə şərtlər və ya materiallar Şərtlərin tərkib hissəsini təşkil edəcəkdir. Biz Sizin və digər üçüncü şəxslərin qarşısında bu cür dəyişiklik, yeniləmə və ya silməyə görə heç bir məsuliyyət daşımırıq. Yeniliklərdən xəbərdar olmaq üçün mütəmadi olaraq Şərtlərə baxmaq Sizin öz məsuliyyətinizdədir. Şərtlərə edilmiş dəyişikliklər Sistemdə yerləşdirildikdən sonra Sizin Məbil tətbiqdən istifadəni davam etdirməniz bu cür dəyişikliklərdən xəbərdar olmağınızı və onları qəbul etməyinizi bildirir.
        Biz, Sistemin fasiləsiz işləməsinə təminat vermirik. Biz, proqram təminatı, texniki təminat və ya Sistemə digər problemlərlə üzləşə bilərik və buna görə Sistemdə dayanmalar, ləngimələr və səhvlər ola bilər. Siz, Sistemin dayanması və ya ona çıxışın olmaması, istifadəsində kəsintilərin və yaxud digər problemlərin olmasına görə Bizim heç bir zərər, itki və ya narahatçılığa görə məsuliyyət daşımadığımızı qəbul edirsiniz. Bu Şərtlərin heç bir müddəası Bizim üzərimizə Sistemi dəstəkləmək və onunla bağlı hər hansı düzəlişləri, yeniləmələri və s. əməliyyatları həyata keçirməklə bağlı öhdəlik qoyması kimi şərh edilə bilməz. </Text> 

        <Text style={styles.title}>DİGƏR MÜDDƏALAR</Text>

        <Text style={styles.text}>Bu Şərtlər Azərbaycan Respublikasının qanunvericiliyinə əsasən tənzimlənir və bu Şərtlərdən irəli gələn və ya onunla bağlı olan istənilən mübahisələrə baxmaq səlahiyyəti müstəsna olaraq Azərbaycan Respublikasının məhkəmələrinin səlahiyyətindədir. 
        Siz qəbul edirsiniz ki, bu Sistemdən istifadənin nəticəsi olaraq Sizinlə Şirkət arasında heç bir tərəfdaşlıq, birgə fəaliyyət, agent münasibətləri yaranmır. Şirkət tərəfindən Şərtlərin yerinə yetirilməsi qanunvericiliklə müəyyən edilmiş tələblərin icrasına heç bir xələl gətirmir və burada müəyyən edilənlərin heç biri Şirkətin hüquq-mühafizə və digər dövlət orqanları, məhkəmələr qarşısında Sizin Sistemdən istifadənizə və ya bu cür istifadə ilə bağlı toplanmış məlumatlara dair sorğu və tələblərinə əməl etmək öhdəliyinə təsir göstərmir. Əgər bu Şərtlərin hər hansı hissəsi tətbiq edilən qanunvericiliyə əsasən etibarsız və ya hüquqi qüvvəsi olmayan sayılarsa, həmin hissələr ilkin müddəaların niyyətinə ən çox uyğun gələn müddəalarla əvəz ediləcəkdir və Şərtlərin qalan müddəaları qüvvədə qalmaqda davam edəcəkdir. 
        Hazırkı Şərtlər Sistemdən istifadəyə dair Sizinlə Şirkət arasında tam razılaşmanı təşkil edir və Tərəflər arasında yazılı, şifahi və ya elektron formada mövcud olmuş bütün əvvəlki yazışmaları, təklifləri və razılaşmaları əvəz edir. Bu Şərtlərin çap olumuş mətni və elektron formada verilmiş istənilən bildiriş istənilən məhkəmə icraatında kağız daşıyıcıda əl ilə imzalanmış və ya başqa cür təsdiq edilən rəsmi sənədlərə bərabər tutulacaqdır.</Text> 

        <Text style={styles.title}>BİZİMLƏ ƏLAQƏ</Text>
        <Text style={styles.text}>Sistemlə bağlı şikayət olduqda və ya Sistemdən istifadəyə dair əlavə məlumat almaq istədikdə, bizimlə aşağıdakı vasitələrlə əlaqə saxlaya bilərsiniz: 

        İnfo@meliyo.com</Text>
        
    </CommonLayout>
)};

const styles = StyleSheet.create({

    text :  {
        color: colors.blanko , 
    } , 
    title : {
        marginVertical:  helper.px(15) , 
        textTransform: "uppercase" , 
        color: colors.blanko , 
        fontWeight: "600" , 
    }, 
    
});


export default Terms;
