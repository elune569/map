/**
 * 지도 생성
 */
var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = { 
        center: new kakao.maps.LatLng(36.3011594553915 , 127.31366147588993 ), // 지도의 중심좌표
        level: 1 // 지도의 확대 레벨
    };

// 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
var map = new kakao.maps.Map(mapContainer, mapOption); 

var markers = [];

/**
 * 지도 컨트롤러
 */
// 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
var mapTypeControl = new kakao.maps.MapTypeControl();

// 지도에 컨트롤을 추가해야 지도위에 표시됩니다
// kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

// 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
var zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

/**
 * 검색
 */
// 주소로 좌표를 검색합니다
const clickSearch = function() {
    // 주소-좌표 변환 객체를 생성합니다
    var geocoder = new kakao.maps.services.Geocoder();

    geocoder.addressSearch(document.getElementById("search").value, function(result, status) {
    
        // 정상적으로 검색이 완료됐으면 
         if (status === kakao.maps.services.Status.OK) {
    
            let search_result = document.getElementById("search_result");

            search_result.innerHTML = "";

            // 테이블 생성
            let table = document.createElement("table");

            // 검색결과 출력
            result.forEach(function(item, idx) {

                let tr = document.createElement("tr");
                let td = document.createElement("td");
                let a =  document.createElement("a");
                let br = document.createElement("br");

                a.href = "#";
                a.onclick = function() { clickResult(result[idx].x, result[idx].y, item.address.address_name); }
                a.append(item.address.address_name);
                td.append(a);
                if (JSON.stringify(item.road_address) != "{}") {
                    td.append(br)
                    td.append(item.road_address.address_name);
                }
                tr.append(td);
                table.append(tr);

            })

            search_result.append(table);
            
        } 
    });    
}

/**
 * 결과 클릭
 * @param {*} x 
 * @param {*} y 
 * @param {*} name 
 */
const clickResult = function(x, y, name) {
    var coords = new kakao.maps.LatLng(y, x);
            
    // 결과값으로 받은 위치를 마커로 표시합니다
    var marker = new kakao.maps.Marker({
        map: map,
        position: coords
    });

    // 인포윈도우로 장소에 대한 설명을 표시합니다
    // var infowindow = new kakao.maps.InfoWindow({
    //     content: '<div style="width:150px;text-align:center;padding:6px 0;">' + name + '</div>'
    // });
    // infowindow.open(map, marker);

    // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
    map.setCenter(coords);

    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map);
    
    // 생성된 마커를 배열에 추가합니다
    markers.push(marker);
}

function setMarkers(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }            
}

function removeMarkers() {
    
}