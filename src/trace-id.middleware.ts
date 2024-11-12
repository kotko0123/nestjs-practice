import {Injectable, NestMiddleware} from '@nestjs/common';
import {v4 as uuidv4} from 'uuid';
import {createNamespace} from 'cls-hooked';

const REQUEST_CONTEXT = 'request-context';
const TRACE_ID = 'TRACE_ID';

const namespace = createNamespace(REQUEST_CONTEXT);

@Injectable()
export class TraceIdMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    // 새로운 context 생성
    namespace.run(() => {
      const traceId = req.get('X-Tracer-Id') || uuidv4();
      setTraceId(traceId);
      next();
    });
  }
}

// Trace ID를 설정하는 함수
function setTraceId(traceId: string) {
  namespace.set(TRACE_ID, traceId);
}

// Trace ID를 가져오는 함수
export function getTraceId(): string | undefined {
  return namespace.get(TRACE_ID);
}
