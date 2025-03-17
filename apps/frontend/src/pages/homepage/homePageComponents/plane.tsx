import { useEffect, useRef, RefObject } from 'react';
import { gsap } from 'gsap';
import { CustomEase } from 'gsap/CustomEase';

gsap.registerPlugin(CustomEase);

interface SVGPointArray extends Array<SVGPoint> {
  x?: number;
}

const AirplaneTrailAnimation = () => {
  const mainSVGRef: RefObject<SVGSVGElement> = useRef(null);
  const patternSVGRef: RefObject<SVGSVGElement> = useRef(null);
  const trailLinesRef = useRef<SVGPolylineElement[]>([]);
  const planesRef = useRef<SVGPathElement[]>([]);

  useEffect(() => {
    if (!mainSVGRef.current) return;

    const mainSVG = mainSVGRef.current;
    const allPlanes = planesRef.current;
    const allTrailLines = trailLinesRef.current;
    const numPoints = 400;
    const svgHeight = 600;
    const height = svgHeight;
    const allTrailPoints: SVGPointArray[] = [];
    const planeColorArray = ['#04BCE8', '#EA6360', '#4EBE92', '#A83395', '#4A52A6', '#F2CD5D'];
    const planeWidth = allPlanes[0]?.getBBox().width || 0;
    const pivotFrame = 60;

    gsap.defaults({ lazy: true });
    gsap.set('svg', {
      visibility: 'visible'
    });
    gsap.set(allPlanes, {
      transformOrigin: '50% 100%',
      yPercent: -20
    });

    let trailEase = CustomEase.create('trail', 'M0,0 C0,0 0.08957,0.04997 0.14563,0.07332 0.17361,0.08497 0.19406,0.08816 0.22447,0.09346 0.25234,0.09831 0.27245,0.10281 0.29876,0.1 0.3304,0.09662 0.3574,0.09206 0.38526,0.07627 0.46146,0.0331 0.50906,-0.01658 0.58698,-0.06332 0.61735,-0.08154 0.64322,-0.09168 0.67604,-0.09815 0.70315,-0.10349 0.72556,-0.09999 0.75503,-0.09644 0.7862,-0.09269 0.8064,-0.0881 0.83671,-0.07879 0.87049,-0.06842 0.89148,-0.06013 0.92338,-0.04473 0.95378,-0.03007 1,0 1,0 ');

    const swayPlane = (_id: number) => {
      if (!allTrailPoints[_id]) return;
      
      gsap.set(allPlanes[_id], {
        x: allTrailPoints[_id][0].x - (planeWidth/2),
        y: allTrailPoints[_id][0].y - planeWidth
      });
      gsap.to(allPlanes[_id], {
        duration: 0.1,
        rotation: ((planeInitArray[_id].x - (allTrailPoints[_id][pivotFrame]?.x || 0)) * 0.72),
        ease: 'sine.inOut'
      });
    };

    let planeInitArray: Array<{x: number, y: number}> = [];                               
    
    for(let j = 0; j < allPlanes.length; j++) {
      let trailLine = allTrailLines[j];
      let pointX = gsap.utils.random(250, 350);
      let pointArray: SVGPoint[] = [];
      let heightMultiplier = gsap.utils.random(0.11, 0.8);
      let duration = gsap.utils.random(5, 20);
      
      gsap.set(allTrailLines[j], {
        stroke: planeColorArray[j]
      });
      
      for(let i = 0; i < numPoints; i++) {
        if (!trailLine?.points) continue;
        let point = trailLine.points.appendItem(mainSVG.createSVGPoint());
        pointArray.push(point);
        point.x = pointX;
        point.y = (height * heightMultiplier) + (i * ((height) / numPoints));
      }
      
      allTrailPoints.push(pointArray);
      planeInitArray.push({x: pointArray[0]?.x || 0, y: pointArray[0]?.y || 0});
      
      gsap.to(allTrailPoints[j], {
        duration: gsap.utils.random(7, 14),
        x: '-=' + gsap.utils.random(-600, 600),
        stagger: {
          each: duration / 1000,
          repeat: -1
        },
        onUpdate: () => swayPlane(j),
        ease: trailEase
      }).seek(gsap.utils.random(300, 1000));
    }

    let extraTl = gsap.timeline();
    extraTl.to('#grid', {
      duration: 1,
      y: '+=40',
      ease: 'none',
      repeat: -1
    });

    allTrailLines.forEach((i) => {
      gsap.to(i, {
        strokeDashoffset: -(14 * 4),
        duration: gsap.utils.random(0.5, 0.76),
        repeat: -1,
        ease: 'none'
      });
    });

    return () => {
      gsap.globalTimeline.clear();
    };
  }, []);

  const addTrailLineRef = (el: SVGPolylineElement | null) => {
    if (el && !trailLinesRef.current.includes(el)) {
      trailLinesRef.current.push(el);
    }
  };

  const addPlaneRef = (el: SVGPathElement | null) => {
    if (el && !planesRef.current.includes(el)) {
      planesRef.current.push(el);
    }
  };

  return (
    <div className="w-full flex items-center justify-center overflow-visible h-screen mt-4">
    <svg ref={patternSVGRef} id="patternSVG" xmlns="http://www.w3.org/2000/svg" className="absolute w-full h-full">
      <defs>
        <pattern id="sqrs" width="20" height="20" patternUnits="userSpaceOnUse" viewBox="0 0 20 20">
          <rect className="gridRect" x="0" y="0" width="20" height="20" fill="none" stroke="#0074b3" />
        </pattern>
      </defs>
      <rect id="grid" className="grid" y="-100" fill="url(#sqrs)" width="100%" height="200%" stroke="none" />
    </svg>
    
    <svg ref={mainSVGRef} id="mainSVG" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" className="absolute w-full h-full">
      <defs>
        <filter id="glow" x="-100%" y="-100%" width="250%" height="250%">
          <feGaussianBlur stdDeviation="8" result="coloredBlur" />
          <feOffset dx="0" dy="0" result="offsetblur"></feOffset>
          <feFlood id="glowAlpha" floodColor="#FFF" floodOpacity="1"></feFlood>
          <feComposite in2="offsetblur" operator="in"></feComposite>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic"></feMergeNode>
          </feMerge>
        </filter>
      </defs>
      
      <g>
        {/* Only render one set of trails and planes */}
        {[...Array(3)].map((_, i) => (
          <g key={i}>
            <polyline
              ref={addTrailLineRef}
              className="trailLine"
              stroke="#0074b3"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="4 10"
            />
            <path
              ref={addPlaneRef}
              className="plane"
              d="M20,13.7v-1.4l-8.6-5.1V3.5c0-1-0.6-3.5-1.4-3.5S8.6,2.4,8.6,3.5v3.7L0,12.2v1.4l8.6-1.8l0.5,5l-2.5,1.9V20 l3.5-0.8l3.5,0.8v-1.2L11,16.9l0.5-5L20,13.7z"
              fill="#CCC"
            />
          </g>
        ))}
      </g>
    </svg>
  </div>
  );
};

export default AirplaneTrailAnimation;