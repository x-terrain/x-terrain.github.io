const align = () => {
    let screenPoints_x = [];
    let screenPoints_y = [];
  
    for(let i=0; i<lSys.screenPoints.length; i++) {
        screenPoints_x.push(lSys.screenPoints[i].x);
        screenPoints_y.push(lSys.screenPoints[i].y);
    }

    let xmin = min(screenPoints_x); 
    let xmax = max(screenPoints_x);
    let ymin = min(screenPoints_y);
    let ymax = max(screenPoints_y);
    let offset = createVector(width/2 - xmax/2, height/2.5 - ymax/2);
    return offset;
}

