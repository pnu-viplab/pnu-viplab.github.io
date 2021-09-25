clear;

v = VideoReader("vid.mp4");

filename = 'visual_inspection.gif';

flag_init = false;

cnt = 0;

while hasFrame(v)
    if v.CurrentTime > 5
        break;
    end
    
    cnt = cnt+1;
    
    f = readFrame(v);
    
    if mod(cnt, 5) > 0
        continue;
    end
    
    f = imresize(f, 0.25);
    
    [imind, cm] = rgb2ind(f, 256);
    
    if ~flag_init
        imwrite(imind, cm, filename, 'gif', 'Loopcount', inf, 'DelayTime', 1/10);
        flag_init = true;
    else
        imwrite(imind, cm, filename, 'gif', 'WriteMode', 'append', 'DelayTime', 1/10);
    end
end