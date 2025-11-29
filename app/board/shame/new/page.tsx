'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertCircle, Upload, ArrowLeft } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

const THEME = {
  bg: 'from-slate-950 via-slate-900 to-slate-950',
  card: 'bg-slate-900/50 border-slate-800/50',
  accent: 'from-red-600 to-orange-600',
};

// 서버 목록
const SERVERS = {
  천족: [
    '시엘', '아리엘', '네자칸', '바이젤', '카이시넬', '유스티엘', '프레기온',
    '메스람타에다', '히타니에', '바카르마', '카사카', '챈가룽', '나니아', '다미누',
    '코치룽', '이슈타르', '페르노스', '루터스', '타하바타', '티아마트', '포에타'
  ],
  마족: [
    '이스라펠', '지켈', '트리니엘', '아스펠', '루미엘', '에레슈키갈', '네몬',
    '크로메데', '무닌', '젠카카', '콰이링', '브리트라', '하달', '바바룽',
    '파프니르', '마르쿠탄', '오다르', '루드라', '울고른', '인드라흐', '이스할겐'
  ]
};

export default function NewShamePostPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    player_id: '',
    server: '',
    race: '',
    reason: '',
  });
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [availableServers, setAvailableServers] = useState<string[]>([]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    // 종족 선택 시 서버 목록 업데이트
    if (field === 'race') {
      setAvailableServers(SERVERS[value as '천족' | '마족'] || []);
      // 종족 변경 시 기존 서버 선택 초기화
      setFormData(prev => ({ ...prev, server: '' }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setScreenshot(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let screenshot_url = '';

      // 스크린샷 업로드
      if (screenshot) {
        const fileExt = screenshot.name.split('.').pop();
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('screenshots')
          .upload(filePath, screenshot);

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from('screenshots')
          .getPublicUrl(filePath);

        screenshot_url = urlData.publicUrl;
      }

      // API를 통해 게시글 생성 (IP 제한 체크 포함)
      const response = await fetch('/api/shame', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          screenshot_url,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        // 제한에 걸린 경우 사용자에게 명확한 메시지 표시
        if (result.errorType === 'DAILY_LIMIT_EXCEEDED') {
          alert('⚠️ 일일 박제 제한\n\n' + result.error);
        } else if (result.errorType === 'DUPLICATE_REPORT') {
          alert('⚠️ 중복 신고 불가\n\n' + result.error);
        } else {
          alert(result.error || '박제 중 오류가 발생했습니다.');
        }
        return;
      }

      alert('박제가 완료되었습니다!');
      router.push('/board/shame');
    } catch (error) {
      console.error('Error creating shame post:', error);
      alert('박제 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${THEME.bg} text-white`}>
      <main className="container mx-auto px-6 py-12 max-w-3xl">
        {/* 헤더 */}
        <div className="mb-8">
          <Link href="/board/shame">
            <Button variant="ghost" className="mb-4 hover:bg-slate-800/50">
              <ArrowLeft className="w-4 h-4 mr-2" />
              목록으로
            </Button>
          </Link>

          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-red-600 to-orange-600 shadow-lg">
              <AlertCircle className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">🚨 박제하기</h1>
              <p className="text-slate-400 mt-1">비매너 유저 신고</p>
            </div>
          </div>
        </div>

        {/* 작성 폼 */}
        <Card className={`${THEME.card} border backdrop-blur-xl`}>
          <CardHeader>
            <CardTitle>신고 정보 입력</CardTitle>
            <CardDescription className="text-slate-400">
              정확한 정보를 입력해주세요. 허위 신고는 제재될 수 있습니다.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 플레이어 ID */}
              <div className="space-y-2">
                <Label htmlFor="player_id">플레이어 ID *</Label>
                <Input
                  id="player_id"
                  value={formData.player_id}
                  onChange={(e) => handleInputChange('player_id', e.target.value)}
                  required
                  placeholder="신고할 플레이어의 ID를 입력하세요"
                  className="bg-slate-800/50 border-slate-700 focus:border-red-500"
                />
              </div>

              {/* 종족 (먼저 선택) */}
              <div className="space-y-2">
                <Label htmlFor="race">종족 *</Label>
                <Select value={formData.race} onValueChange={(value) => handleInputChange('race', value)} required>
                  <SelectTrigger className="bg-slate-800/50 border-slate-700 focus:border-red-500">
                    <SelectValue placeholder="종족을 먼저 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="천족">천족</SelectItem>
                    <SelectItem value="마족">마족</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 서버 (종족 선택 후) */}
              <div className="space-y-2">
                <Label htmlFor="server">서버 *</Label>
                <Select
                  value={formData.server}
                  onValueChange={(value) => handleInputChange('server', value)}
                  required
                  disabled={!formData.race}
                >
                  <SelectTrigger className="bg-slate-800/50 border-slate-700 focus:border-red-500 disabled:opacity-50">
                    <SelectValue placeholder={formData.race ? "서버를 선택하세요" : "종족을 먼저 선택하세요"} />
                  </SelectTrigger>
                  <SelectContent>
                    {availableServers.map((server) => (
                      <SelectItem key={server} value={server}>
                        {server}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* 사유 */}
              <div className="space-y-2">
                <Label htmlFor="reason">신고 사유 *</Label>
                <Textarea
                  id="reason"
                  value={formData.reason}
                  onChange={(e) => handleInputChange('reason', e.target.value)}
                  required
                  placeholder="구체적인 신고 사유를 작성해주세요..."
                  rows={5}
                  className="bg-slate-800/50 border-slate-700 focus:border-red-500"
                />
              </div>

              {/* 스크린샷 업로드 */}
              <div className="space-y-2">
                <Label htmlFor="screenshot">스크린샷 (선택)</Label>
                <div className="border-2 border-dashed border-slate-700 rounded-lg p-6 text-center hover:border-red-500 transition-colors">
                  <input
                    type="file"
                    id="screenshot"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label htmlFor="screenshot" className="cursor-pointer">
                    {previewUrl ? (
                      <img src={previewUrl} alt="Preview" className="max-h-64 mx-auto rounded-lg" />
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <Upload className="w-12 h-12 text-slate-600" />
                        <p className="text-slate-400">클릭하여 이미지 업로드</p>
                        <p className="text-xs text-slate-600">PNG, JPG, GIF (최대 5MB)</p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* 제출 버튼 */}
              <div className="flex gap-4 pt-4">
                <Link href="/board/shame" className="flex-1">
                  <Button type="button" variant="outline" className="w-full" disabled={loading}>
                    취소
                  </Button>
                </Link>
                <Button
                  type="submit"
                  className={`flex-1 bg-gradient-to-r ${THEME.accent} hover:opacity-90`}
                  disabled={loading}
                >
                  {loading ? '제출 중...' : '박제하기'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
