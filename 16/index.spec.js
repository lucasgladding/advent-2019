const { loop, process } = require('./index');

const input = '59754835304279095723667830764559994207668723615273907123832849523285892960990393495763064170399328763959561728553125232713663009161639789035331160605704223863754174835946381029543455581717775283582638013183215312822018348826709095340993876483418084566769957325454646682224309983510781204738662326823284208246064957584474684120465225052336374823382738788573365821572559301715471129142028462682986045997614184200503304763967364026464055684787169501819241361777789595715281841253470186857857671012867285957360755646446993278909888646724963166642032217322712337954157163771552371824741783496515778370667935574438315692768492954716331430001072240959235708';

describe('16', () => {
  it('example 1', () => {
    const sequence = [1, 2, 3, 4, 5, 6, 7, 8];
    const pattern = [0, 1, 0, -1];
    const output1 = process(sequence, pattern);
    const output2 = process(output1, pattern);
    const output3 = process(output2, pattern);
    const output4 = process(output3, pattern);
    expect(output4).toEqual([0, 1, 0, 2, 9, 4, 9, 8]);
  });

  it('example 2', () => {
    const sequence = decode('80871224585914546619083218645595');
    const pattern = [0, 1, 0, -1];
    const output = loop(sequence, pattern, 100);
    expect(encode(output)).toEqual('24176176');
  });

  it('example 3', () => {
    const sequence = decode('19617804207202209144916044189917');
    const pattern = [0, 1, 0, -1];
    const output = loop(sequence, pattern, 100);
    expect(encode(output)).toEqual('73745418');
  });

  it('example 4', () => {
    const sequence = decode('69317163492948606335995924319873');
    const pattern = [0, 1, 0, -1];
    const output = loop(sequence, pattern, 100);
    expect(encode(output)).toEqual('52432133');
  });

  it('part 1', () => {
    const sequence = decode(input);
    const pattern = [0, 1, 0, -1];
    const output = loop(sequence, pattern, 100);
    expect(encode(output)).toEqual('22122816');
  });

  it('example 5', () => {
    const sequence = decode('03036732577212944063491565474664');
    const offset = 303673;
    const tacos = decode_sequence(sequence, offset);
    console.log('done', tacos.join(''));
  });
});

// 84462026

function decode_sequence(sequence, offset) {
  const length = sequence.length;
  const pos = offset % length;
  const iterations = Math.ceil(offset / length);
  const cycles = 10000 - iterations - 1;
  const output = compute(sequence);
  const initial = cycles * output[0];
  const decoded = compute(sequence, 0);
  return decoded;
}

function compute(sequence, initial = 0) {
  const length = sequence.length;
  const output = Array(length);
  let previous = initial;
  for (let i = length - 1; i >= 0; i--) {
    const current = (previous + sequence[i]) % 10;
    output[i] = current;
    previous = current;
  }
  return output;
}

function decode(string) {
  return string.split('').map(digit => parseInt(digit));
}

function encode(input) {
  return input.slice(0, 8).join('');
}

function repeat(input, times = 10000) {
  let output = [];
  for (let i = 0; i < times; i++) {
    output = output.concat(input);
  }
  return output;
}
